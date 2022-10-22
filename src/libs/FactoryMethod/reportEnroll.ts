import { Product } from './product';
import PDF from 'pdfkit-table';
import { ModelData } from '@libs/common/types';

export class ReportEnroll extends PDF implements Product {
  data: ModelData;
  constructor(data) {
    super();
    this.data = data;
  }

  operation() {
    this.title();
    this.subTitle();
    this.fields();
    this.createTable();
    return this;
  }

  title(): void {
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

  createTable() {
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
    this.table(table, {
      columnsSize: [50, 150, 50, 150, 50],
    });
  }
}
