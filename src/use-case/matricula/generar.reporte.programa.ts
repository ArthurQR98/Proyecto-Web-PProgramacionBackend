import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { Code } from '@libs/common/code';
import { Exception } from '@libs/common/exception';
import { Creator } from '@libs/FactoryMethod/creator';
import { ReportEnrollsByProgramCreate } from '@libs/FactoryMethod/reportEnrollsByProgramCreate';

export class GenerateReportByProgram {
  constructor(private readonly enrollRepository: EnrollRepositoryPort) {}

  async execute(payload: number, res): Promise<void> {
    const data = await this.enrollRepository.findEnrollByProgram(payload);
    if (!data) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'La Matricula no existe',
      });
    }
    const build = (creator: Creator) => {
      return creator.someOperation();
    };
    const pdf = build(new ReportEnrollsByProgramCreate(data));
    pdf.pipe(res);
    pdf.end();
  }
}
