import { CreateMatriculaDto } from '@app/dtos/matricula/matricula.dto';
import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { Code } from '@libs/common/code';
import { Exception } from '@libs/common/exception';
import { UseCase } from '@libs/contract/use-case';
import { Matricula } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';

export class CreateEnroll implements UseCase<CreateMatriculaDto, Matricula> {
  constructor(
    private readonly enrollRepository: EnrollRepositoryPort,
    private readonly studentRepository: StudentRepositoryPort,
  ) {}

  async execute(payload: CreateMatriculaDto): Promise<Matricula> {
    const student = await this.studentRepository.findStudentByCode(
      payload.estudianteCode,
    );
    if (!student) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'Estudiante no existe',
      });
    }
    return this.enrollRepository.storeEnroll(payload);
  }
}
