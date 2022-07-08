import { CourseRepositoryPort } from '@domain/curso/port/persistence/curso.repository';
import { FindCoursePort } from '@domain/curso/port/use-case/obtener-curso';
import { UseCase } from '@libs/contract/use-case';
import { Curso } from '@prisma/client';
import { PaginatedResult } from 'prisma-pagination';

export class FindCourses
  implements UseCase<FindCoursePort, PaginatedResult<Curso>>
{
  constructor(private readonly studentRepository: CourseRepositoryPort) {}

  async execute(payload: FindCoursePort): Promise<PaginatedResult<Curso>> {
    return this.studentRepository.findCourses(payload);
  }
}
