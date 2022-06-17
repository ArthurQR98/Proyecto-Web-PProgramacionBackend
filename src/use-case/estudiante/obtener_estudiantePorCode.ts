import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';

export class FindStudentByCode implements UseCase<string, Estudiante> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: string): Promise<Estudiante> {
    return this.studentRepository.findStudentByCode(payload);
  }
}
