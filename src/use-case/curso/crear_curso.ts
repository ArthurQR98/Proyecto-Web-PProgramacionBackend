import { Curso } from '@prisma/client';
import { CreateCourseDto } from '@app/dtos/curso/registro.curso.dto';
import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { ConfigService } from '@nestjs/config';
import { uploadImage } from '@libs/common/upload-image';
import { validImage } from '@libs/common/valid-image';

export class CreateCourse {
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    image: Express.Multer.File,
    payload: CreateCourseDto,
  ): Promise<Curso> {
    let upload;
    if (image) {
      validImage(image);
      upload = await uploadImage(image, this.configService);
    }
    return this.courseRepository.storeCourse(
      Object.assign(payload, {
        programa: Number(payload.programa),
        periodo: Number(payload.periodo),
        creditos: Number(payload.creditos),
        nHoras: Number(payload.nHoras),
        url_image: upload ? upload?.Location : null,
        key_image: upload ? upload?.Key : null,
      }),
    );
  }
}
