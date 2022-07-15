import PDF from 'pdfkit-table';
import { ModelData } from './types';

export class ReportEnroll extends PDF {
  data: ModelData;
  constructor(data, options?: PDFKit.PDFDocumentOptions | undefined) {
    super(options);
    this.data = data;
  }

  title() {
    this.font('Times-Bold').text(
      'INSTITUTO TECNOLOGÍCO PÚBLICO FLORENCIA DE MORA',
      {
        align: 'center',
      },
    );
  }

  subTitle() {
    this.fontSize(10)
      .font('Times-Bold')
      .text('FICHA DE MATRICULA', { align: 'center' })
      .moveDown(1);
  }

  fields() {
    this.fontSize(8)
      .text(`PROGRAMA  : ${this.data.cursos[0].programa.nombre}`)
      .moveDown(1);
    this.fontSize(8)
      .text(
        `ESTUDIANTE  : ${this.data.estudiante.nombres} ${this.data.estudiante.apellidos}`,
      )
      .moveDown(1);
    this.fontSize(8).text(`FECHA  : ${this.data.fecha}`).moveDown(5);
  }

  async createTable() {
    const table = {
      headers: ['Periodo', 'Asignatura', 'Creditos', 'Docente', 'Nro. Horas'],
      rows: this.data.cursos.map((course) => [
        `${course.periodoId}`,
        `${course.nombre}`,
        `${course.creditos}`,
        `${course.nDocente}`,
        `${course.nHoras}`,
      ]),
    };
    await this.table(table, {
      columnsSize: [50, 150, 50, 150, 50],
    });
  }
}
