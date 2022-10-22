import { CreateMatriculaDto } from '@app/dtos/matricula/matricula.dto';
import { Matricula } from '@prisma/client';
import { PaginatedResult } from 'prisma-pagination';
import { UpdateEnrollPort } from '../use-case/actualizar.matricula';
import { FindEnrollPort } from '../use-case/obtener.matricula';

export interface EnrollRepositoryPort {
  findEnroll(payload: FindEnrollPort): Promise<PaginatedResult<Matricula>>;
  findEnrollById(id: number): Promise<Matricula>;
  findEnrollByProgram(programId: number): Promise<Matricula[]>;
  storeEnroll(payload: CreateMatriculaDto): Promise<Matricula>;
  updateEnroll(payload: UpdateEnrollPort): Promise<Matricula>;
  deleteEnroll(id: number): Promise<Matricula>;
}
