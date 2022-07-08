import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { UseCase } from '@libs/contract/use-case';
import { Curso } from '@prisma/client';

export class FindCourseById implements UseCase<number, Curso> {
  constructor(private readonly studentRepository: CourseRepositoryPort) {}

  async execute(payload: number): Promise<Curso> {
    return this.studentRepository.findCourseById(payload);
  }
}
