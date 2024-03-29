import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { Estudiante } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { uploadImage } from '@libs/common/upload-image';
import { validImage } from '@libs/common/valid-image';

export class CreateStudent {
  constructor(
    private readonly studentRepository: StudentRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    image: Express.Multer.File,
    payload: CreateStudentDto,
  ): Promise<Estudiante> {
    let upload;
    if (image) {
      validImage(image);
      upload = await uploadImage(image, this.configService);
    }
    return this.studentRepository.storeStudent(
      Object.assign(payload, {
        estado: Number(payload.estado),
        edad: Number(payload.edad),
        url_image: upload ? upload?.Location : null,
        key_image: upload ? upload?.Key : null,
      }),
    );
  }
}
