import { UseCase } from '@libs/contract/use-case';
import { Estudiante } from '@prisma/client';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';
import { UpdateStudentPort } from '@domain/estudiante/port/use-case/actualizar-estudiante';

export class UpdateStudent implements UseCase<UpdateStudentPort, Estudiante> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: UpdateStudentPort): Promise<Estudiante> {
    return this.studentRepository.updateStudent(payload.id, payload.data);
  }
}
