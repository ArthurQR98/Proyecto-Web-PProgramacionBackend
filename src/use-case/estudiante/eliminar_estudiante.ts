import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { ConfigService } from '@nestjs/config';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';
import { deleteImage } from '@libs/common/upload-image';

export class DeleteStudent implements UseCase<number, Partial<Estudiante>> {
  constructor(
    private readonly studentRepository: StudentRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(payload: number): Promise<Partial<Estudiante>> {
    const student = await this.studentRepository.findStudentById(payload);
    if (!student) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'Estudiante no existe',
      });
    }
    if (student.url_image && student.key_image) {
      await deleteImage(student.key_image, this.configService);
    }
    return this.studentRepository.deleteStudent(payload);
  }
}
