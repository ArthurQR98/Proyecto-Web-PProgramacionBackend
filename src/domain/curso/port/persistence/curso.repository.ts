import { CreateCourseDto } from '@app/dtos/curso/registro.curso.dto';
import { Curso } from '@prisma/client';
import { PaginatedResult } from 'prisma-pagination';
import { FindCoursePort } from '../use-case/obtener-curso';

export interface CourseRepositoryPort {
  findCourses(payload: FindCoursePort): Promise<PaginatedResult<Curso>>;
  findCourseById(id: number): Promise<Curso>;
  storeCourse(payload): Promise<Curso>;
  updateCourse(id: number, payload: Partial<CreateCourseDto>): Promise<Curso>;
  deleteCourse(id: number): Promise<Partial<Curso>>;
}
