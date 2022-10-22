import PDF from 'pdfkit-table';
type CustomPDF = ReturnType<<T extends PDF>() => T>;

export interface Product {
  operation(): CustomPDF;
}
