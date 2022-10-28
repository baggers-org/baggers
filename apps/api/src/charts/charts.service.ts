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
    securityId: string,
    range: HistorialRange,
    options?: ChartPriceRangeOptions
  ): Promise<Chart[]> {
    return null;
  }
}
