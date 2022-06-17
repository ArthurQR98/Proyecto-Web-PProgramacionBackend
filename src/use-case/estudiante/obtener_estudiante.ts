import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { FindStudentPort } from '@domain/estudiante/port/use-case/obtener-estudiante';

export class FindStudents implements UseCase<FindStudentPort, Estudiante[]> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: FindStudentPort): Promise<Estudiante[]> {
    return this.studentRepository.findStudents(payload);
  }
}
