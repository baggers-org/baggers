import { Securities } from '../data';
import { Security } from '../entities';

export class SecuritiesServiceMock {
  async find(): Promise<Security[]> {
    return Securities;
  }
}
