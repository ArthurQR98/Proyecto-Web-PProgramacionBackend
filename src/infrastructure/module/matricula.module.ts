import { MatriculaController } from '@app/controllers/matricula.controller';
import { StudentTokens } from '@domain/estudiante/token';
import { EnrollTokens } from '@domain/matricula/token';
import { StudentRepository } from '@infrastructure/persistence/prisma/repository/estudiante.repository';
import { EnrollRepository } from '@infrastructure/persistence/prisma/repository/matricula.repository';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Module, Provider } from '@nestjs/common';
import { UpdateEnroll } from '@use-case/matricula/actualizar.matricula';
import { CreateEnroll } from '@use-case/matricula/crear_matricula';
import { DeleteEnroll } from '@use-case/matricula/eliminar.matricula';
import { GenerateReportEnroll } from '@use-case/matricula/generar.reporte';
import { GenerateReportByProgram } from '@use-case/matricula/generar.reporte.programa';
import { FindEnroll } from '@use-case/matricula/obtener_matriculas';

const persistenceProvider: Provider[] = [
  {
    provide: EnrollTokens.Repository,
    useClass: EnrollRepository,
  },
  {
    provide: StudentTokens.Repository,
    useClass: StudentRepository,
  },
];

const useCaseProvider: Provider[] = [
  {
    provide: EnrollTokens.RegisterEnrollUseCase,
    useFactory: (enrollRepository, studentRepository) =>
      new CreateEnroll(enrollRepository, studentRepository),
    inject: [EnrollTokens.Repository, StudentTokens.Repository],
  },
  {
    provide: EnrollTokens.FindEnrollsUseCase,
    useFactory: (enrollRepository) => new FindEnroll(enrollRepository),
    inject: [EnrollTokens.Repository],
  },
  {
    provide: EnrollTokens.UpdateEnrollUseCase,
    useFactory: (enrollRepository) => new UpdateEnroll(enrollRepository),
    inject: [EnrollTokens.Repository],
  },
  {
    provide: EnrollTokens.DeleteEnrollUseCase,
    useFactory: (enrollRepository) => new DeleteEnroll(enrollRepository),
    inject: [EnrollTokens.Repository],
  },
  {
    provide: EnrollTokens.ReportEnrollUseCase,
    useFactory: (enrollRepository) =>
      new GenerateReportEnroll(enrollRepository),
    inject: [EnrollTokens.Repository],
  },
  {
    provide: EnrollTokens.ReportEnrollByProgramUseCase,
    useFactory: (enrollRepository) =>
      new GenerateReportByProgram(enrollRepository),
    inject: [EnrollTokens.Repository],
  },
];

@Module({
  imports: [PrismaModule],
  controllers: [MatriculaController],
  providers: [...persistenceProvider, ...useCaseProvider, PrismaService],
})
export class MatriculaModule {}
