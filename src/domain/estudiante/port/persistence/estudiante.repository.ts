import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';

export interface StudentRepositoryPort {
  findStudents();
  findStudentById(id: number);
  storeStudent(payload: CreateStudentDto);
  updateStudent(payload: Partial<CreateStudentDto>);
  deleteStudent(id: number);
}
