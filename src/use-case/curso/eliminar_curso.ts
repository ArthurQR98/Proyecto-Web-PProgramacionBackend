import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { Code } from '@libs/common/code';
import { Exception } from '@libs/common/exception';
import { deleteImage } from '@libs/common/upload-image';
import { UseCase } from '@libs/contract/use-case';
import { ConfigService } from '@nestjs/config';
import { Curso } from '@prisma/client';

export class DeleteCourse implements UseCase<number, Partial<Curso>> {
  constructor(
    private readonly courseRepository: CourseRepositoryPort,
    private readonly configService: ConfigService,
  ) {}

  async execute(payload: number): Promise<Partial<Curso>> {
    const course = await this.courseRepository.findCourseById(payload);
    if (!course) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'Curso no existe',
      });
    }
    if (course.url_image && course.key_image) {
      await deleteImage(course.key_image, this.configService);
    }
    return this.courseRepository.deleteCourse(payload);
  }
}
