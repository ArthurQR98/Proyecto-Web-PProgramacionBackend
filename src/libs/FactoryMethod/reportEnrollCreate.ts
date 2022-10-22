import { Creator } from './creator';
import { Product } from './product';
import { ReportEnroll } from './reportEnroll';
import { ModelData } from '../common/types';

export class ReportEnrollCreate extends Creator {
  data: ModelData;
  constructor(data) {
    super();
    this.data = data;
  }
  factoryMethod(): Product {
    return new ReportEnroll(this.data);
  }
}
