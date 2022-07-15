import { UseCase } from '@libs/contract/use-case';
import { Matricula } from '@prisma/client';
import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { PaginatedResult } from 'prisma-pagination';
import { FindEnrollPort } from '@domain/matricula/port/use-case/obtener.matricula';

export class FindEnroll
  implements UseCase<FindEnrollPort, PaginatedResult<Matricula>>
{
  constructor(private readonly enrollRepository: EnrollRepositoryPort) {}

  async execute(payload: FindEnrollPort): Promise<PaginatedResult<Matricula>> {
    return this.enrollRepository.findEnroll(payload);
  }
}
