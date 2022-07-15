import { UpdateEnrollPort } from '@domain/matricula/port/use-case/actualizar.matricula';
import { UseCase } from '@libs/contract/use-case';
import { Matricula } from '@prisma/client';
import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';

export class UpdateEnroll implements UseCase<UpdateEnrollPort, Matricula> {
  constructor(private readonly enrollRepository: EnrollRepositoryPort) {}
  async execute(payload: UpdateEnrollPort): Promise<Matricula> {
    const enroll = await this.enrollRepository.findEnrollById(payload.id);
    if (!enroll) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'La Matricula no existe',
      });
    }
    return this.enrollRepository.updateEnroll(payload);
  }
}
