import { EstudianteController } from '@app/controllers/estudiante.controller';
import { StudentTokens } from '@domain/estudiante/token';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { Module, Provider } from '@nestjs/common';
import { CreateStudent } from '@use-case/estudiante/crear_estudiante';
import { StudentRepository } from '../persistence/prisma/repository/estudiante.repository';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

const useCaseProvider: Provider[] = [
  {
    provide: StudentTokens.RegisterStudentUseCase,
    useFactory: (studentRepository) => new CreateStudent(studentRepository),
    inject: [StudentTokens.Repository],
  },
];

@Module({
  imports: [PrismaModule],
  controllers: [EstudianteController],
  providers: [
    {
      provide: StudentTokens.Repository,
      useClass: StudentRepository,
    },
    ...useCaseProvider,
    PrismaService,
  ],
})
export class EstudiantesModule {}
