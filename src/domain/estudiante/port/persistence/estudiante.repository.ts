import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { Estudiante } from '@prisma/client';
import { FindStudentPort } from '../use-case/obtener-estudiante';
export interface StudentRepositoryPort {
  findStudents(payload: FindStudentPort): Promise<Estudiante[]>;
  findStudentById(id: number): Promise<Estudiante>;
  findStudentByCode(code: string): Promise<Estudiante>;
  storeStudent(payload: CreateStudentDto): Promise<Estudiante>;
  updateStudent(
    id: number,
    payload: Partial<CreateStudentDto>,
  ): Promise<Estudiante>;
  deleteStudent(id: number): Promise<Partial<Estudiante>>;
}
