import { Product } from './product';
import PDF from 'pdfkit-table';

export class ReportEnrollsByProgram extends PDF implements Product {
  data;
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
      .text('REPORTE DE MATRICULADOS POR PROGRAMA', { align: 'center' })
      .moveDown(1);
  }

  fields() {
    this.fontSize(8)
      .text(`PROGRAMA  : ${this.data[0].cursos[0].programa.nombre}`)
      .moveDown(1);
  }

  createTable() {
    const table = {
      headers: ['Nombre', 'Apellidos', 'Codigo', 'Periodo', 'Nro. Cursos'],
      rows: this.data.map(({ estudiante, cursos }) => [
        `${estudiante.nombres}`,
        `${estudiante.apellidos}`,
        `${estudiante.codigo}`,
        `${cursos[0].periodo.descripcion}`,
        `${cursos.length}`,
      ]),
    };
    this.table(table, {
      columnsSize: [90, 90, 100, 80, 80],
    });
  }
}
