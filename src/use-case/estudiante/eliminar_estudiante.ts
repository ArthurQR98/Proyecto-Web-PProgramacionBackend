import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';

export class DeleteStudent implements UseCase<number, Partial<Estudiante>> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: number): Promise<Partial<Estudiante>> {
    return this.studentRepository.deleteStudent(payload);
  }
}
