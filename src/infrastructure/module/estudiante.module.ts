import { EstudianteController } from '@app/controllers/estudiante.controller';
import { StudentTokens } from '@domain/estudiante/token';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CreateStudent } from '@use-case/estudiante/crear_estudiante';
import { StudentRepository } from '../persistence/prisma/repository/estudiante.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { FindStudents } from '@use-case/estudiante/obtener_estudiante';
import { FindStudentById } from '@use-case/estudiante/obtener_estudiantePorId';
import { FindStudentByCode } from '@use-case/estudiante/obtener_estudiantePorCode';
import { UpdateStudent } from '@use-case/estudiante/actualizar_estudiante';
import { DeleteStudent } from '@use-case/estudiante/eliminar_estudiante';
import { ConfigModule, ConfigService } from '@nestjs/config';

const persistenceProvider: Provider[] = [
  {
    provide: StudentTokens.Repository,
    useClass: StudentRepository,
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: StudentTokens.RegisterStudentUseCase,
    useFactory: (studentRepository, configService) =>
      new CreateStudent(studentRepository, configService),
    inject: [StudentTokens.Repository, ConfigService],
  },
  {
    provide: StudentTokens.FindStudentsUseCase,
    useFactory: (studentRepository) => new FindStudents(studentRepository),
    inject: [StudentTokens.Repository],
  },
  {
    provide: StudentTokens.FindStudentByIdUseCase,
    useFactory: (studentRepository) => new FindStudentById(studentRepository),
    inject: [StudentTokens.Repository],
  },
  {
    provide: StudentTokens.FindStudentByCodeUseCase,
    useFactory: (studentRepository) => new FindStudentByCode(studentRepository),
    inject: [StudentTokens.Repository],
  },
  {
    provide: StudentTokens.UpdateStudentUseCase,
    useFactory: (studentRepository, configService) =>
      new UpdateStudent(studentRepository, configService),
    inject: [StudentTokens.Repository, ConfigService],
  },
  {
    provide: StudentTokens.DeleteStudentUseCase,
    useFactory: (studentRepository, configService) =>
      new DeleteStudent(studentRepository, configService),
    inject: [StudentTokens.Repository, ConfigService],
  },
];

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [EstudianteController],
  providers: [...persistenceProvider, ...useCaseProvider, PrismaService],
})
export class EstudiantesModule {}
