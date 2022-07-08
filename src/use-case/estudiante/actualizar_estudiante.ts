import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { UpdateStudentPort } from '@domain/estudiante/port/use-case/actualizar-estudiante';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';
import { deleteImage, uploadImage } from '@libs/common/upload-image';
import { ConfigService } from '@nestjs/config';
import { validImage } from '@libs/common/valid-image';

export class UpdateStudent implements UseCase<UpdateStudentPort, Estudiante> {
  constructor(
    private readonly studentRepository: StudentRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(payload: UpdateStudentPort): Promise<Estudiante> {
    let upload;
    const student = await this.studentRepository.findStudentById(payload.id);
    if (!student) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'Estudiante no existe',
      });
    }
    if (payload.image && student.key_image) {
      await deleteImage(student.key_image, this.configService);
    }
    if (payload.image) {
      validImage(payload.image);
      upload = await uploadImage(payload.image, this.configService);
    }
    return this.studentRepository.updateStudent(
      payload.id,
      Object.assign(payload.data, {
        estado: Number(payload.data.estado || student.estadoId),
        edad: Number(payload.data.edad || student.edad),
        url_image: upload?.Location,
        key_image: upload?.Key,
      }),
    );
  }
}
