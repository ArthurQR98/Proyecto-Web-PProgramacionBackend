import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';
import { Creator } from '@libs/FactoryMethod/creator';
import { ReportEnrollCreate } from '@libs/FactoryMethod/reportEnrollCreate';

export class GenerateReportEnroll {
  constructor(private readonly enrollRepository: EnrollRepositoryPort) {}

  async execute(payload: number, res): Promise<void> {
    const data = await this.enrollRepository.findEnrollById(payload);
    if (!data) {
      throw Exception.new({
        code: Code.NOT_FOUND_ERROR,
        overrideMessage: 'La Matricula no existe',
      });
    }

    const build = (creator: Creator) => {
      return creator.someOperation();
    };
    const pdf = build(new ReportEnrollCreate(data));
    pdf.pipe(res);
    pdf.end();
  }
}
