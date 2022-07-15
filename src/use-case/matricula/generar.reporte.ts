import { ReportEnroll } from '@libs/common/report-enroll';
import { EnrollRepositoryPort } from '@domain/matricula/port/persistence/matricula.repository';
import { Exception } from '@libs/common/exception';
import { Code } from '@libs/common/code';

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
    const doc = new ReportEnroll(data);
    doc.title();
    doc.subTitle();
    doc.fields();
    doc.createTable();
    doc.pipe(res);
    doc.end();
  }
}
