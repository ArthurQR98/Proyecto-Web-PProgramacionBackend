import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';

export class FindStudentById implements UseCase<number, Estudiante> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: number): Promise<Estudiante> {
    return this.studentRepository.findStudentById(payload);
  }
}
