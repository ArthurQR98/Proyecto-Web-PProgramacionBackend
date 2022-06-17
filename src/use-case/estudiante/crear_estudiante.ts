import { UseCase } from '@libs/contract/use-case';
import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { Estudiante } from '@prisma/client';

export class CreateStudent implements UseCase<CreateStudentDto, Estudiante> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: CreateStudentDto): Promise<Estudiante> {
    return this.studentRepository.storeStudent(payload);
  }
}
