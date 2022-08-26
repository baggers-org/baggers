import { Injectable } from '@nestjs/common';
import { IexService } from '~/iex/iex.service';
import { SecuritiesService } from '~/securities';
import { ObjectId } from '~/shared';
import { ChartPriceRangeOptions } from './dto/chart-price-range-options.input';
import { Chart } from './entities/chart.entity';
import { HistorialRange } from './enums/historial-range.enum';

@Injectable()
export class ChartsService {
  constructor(
    private iexService: IexService,
    private securitiesService: SecuritiesService
  ) {}
  async chartSecurityPrice(
    securityId: ObjectId,
    range: HistorialRange,
    options?: ChartPriceRangeOptions
  ): Promise<Chart[]> {
    const security = await this.securitiesService.findById(securityId);
    const { data } = await this.iexService.client.get(
      `/stock/${security.symbol}/chart/${range}`,
      {
        params: options,
      }
    );

    return data;
  }
}
