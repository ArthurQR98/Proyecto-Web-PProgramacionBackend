import { UseCase } from '@libs/contract/use-case';
import { CreateStudentDto } from '@app/dtos/estudiante/registro.estudiante.dto';
import { StudentRepositoryPort } from '@domain/estudiante/port/persistence/estudiante.repository';

export class CreateStudent implements UseCase<CreateStudentDto, any> {
  constructor(private readonly studentRepository: StudentRepositoryPort) {}

  async execute(payload: CreateStudentDto): Promise<any> {
    return this.studentRepository.storeStudent(payload);
  }
}
