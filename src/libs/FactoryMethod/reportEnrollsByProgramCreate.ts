import { Creator } from './creator';
import { Product } from './product';
import { ModelData } from '../common/types';
import { ReportEnrollsByProgram } from './reportEnrollsByProgram';

export class ReportEnrollsByProgramCreate extends Creator {
  data: ModelData;
  constructor(data) {
    super();
    this.data = data;
  }
  factoryMethod(): Product {
    return new ReportEnrollsByProgram(this.data);
  }
}
