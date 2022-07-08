import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { UpdateCoursePort } from '@domain/curso/port/use-case/actualizar-curso';
import { Code } from '@libs/common/code';
import { Exception } from '@libs/common/exception';
import { deleteImage, uploadImage } from '@libs/common/upload-image';
import { validImage } from '@libs/common/valid-image';
import { UseCase } from '@libs/contract/use-case';
import { ConfigService } from '@nestjs/config';
import { Curso } from '@prisma/client';

export class UpdateCourse implements UseCase<UpdateCoursePort, Curso> {
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(payload: UpdateCoursePort): Promise<Curso> {
    let upload;
    const course = await this.courseRepository.findCourseById(payload.id);
    if (!course) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'Curso no existe',
      });
    }
    if (payload.image && course.key_image) {
      await deleteImage(course.key_image, this.configService);
    }
    if (payload.image) {
      validImage(payload.image);
      upload = await uploadImage(payload.image, this.configService);
    }
    return this.courseRepository.updateCourse(
      payload.id,
      Object.assign(payload.data, {
        programa: Number(payload.data.programa || course.programaId),
        periodo: Number(payload.data.periodo || course.periodoId),
        creditos: Number(payload.data.creditos || course.creditos),
        nHoras: Number(payload.data.nHoras || course.nHoras),
        url_image: upload?.Location,
        key_image: upload?.Key,
      }),
    );
  }
}
