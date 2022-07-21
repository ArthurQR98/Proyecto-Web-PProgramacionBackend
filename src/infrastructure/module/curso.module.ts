import { CursoController } from '@app/controllers/curso.controller';
import { CourseTokens } from '@domain/curso/token';
import { CourseRepository } from '@infrastructure/persistence/prisma/repository/curso.repository';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UpdateCourse } from '@use-case/curso/actualizar_curso';
import { CreateCourse } from '@use-case/curso/crear_curso';
import { DeleteCourse } from '@use-case/curso/eliminar_curso';
import { FindCourseById } from '@use-case/curso/obtener_cursoPorId';
import { FindCourses } from '@use-case/curso/obtener_cursos';

const persistenceProvider: Provider[] = [
  {
    provide: CourseTokens.Repository,
    useClass: CourseRepository,
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: CourseTokens.RegisterCourseUseCase,
    useFactory: (courseRepository, configService) =>
      new CreateCourse(courseRepository, configService),
    inject: [CourseTokens.Repository, ConfigService],
  },
  {
    provide: CourseTokens.FindCoursesUseCase,
    useFactory: (courseRepository) => new FindCourses(courseRepository),
    inject: [CourseTokens.Repository],
  },
  {
    provide: CourseTokens.FindCourseByIdUseCase,
    useFactory: (courseRepository) => new FindCourseById(courseRepository),
    inject: [CourseTokens.Repository],
  },
  {
    provide: CourseTokens.UpdateCourseUseCase,
    useFactory: (courseRepository, configService) =>
      new UpdateCourse(courseRepository, configService),
    inject: [CourseTokens.Repository, ConfigService],
  },
  {
    provide: CourseTokens.DeleteCourseUseCase,
    useFactory: (courseRepository, configService) =>
      new DeleteCourse(courseRepository, configService),
    inject: [CourseTokens.Repository, ConfigService],
  },
];

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [CursoController],
  providers: [...persistenceProvider, ...useCaseProvider, PrismaService],
})
export class CursoModule {}
