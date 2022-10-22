import PDFDocumentWithTables from 'pdfkit-table';
import { Product } from './product';

export abstract class Creator {
  abstract factoryMethod(): Product;

  someOperation(): PDFDocumentWithTables {
    const product = this.factoryMethod();
    return product.operation();
  }
}
