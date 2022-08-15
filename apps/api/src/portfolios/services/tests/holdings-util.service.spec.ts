import { NET, TSLA } from '~/securities';
import { Test } from '@nestjs/testing';
import { HoldingFromDb } from '../../entities';
import { HoldingDirection } from '../../enums/holding-direction.enum';
import { HoldingSource } from '../../enums/holding-source.enum';
import { HoldingType } from '../../enums/holding-type.enum';
import { HoldingsUtilService } from '../holdings-util.service';

describe('Holdings Service', () => {
  let service: HoldingsUtilService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [HoldingsUtilService],
    }).compile();
    service = module.get<HoldingsUtilService>(HoldingsUtilService);
  });
  describe('getMergedHoldings', () => {
    it('should work with duplicate LONG holdings', () => {
      const preMerged = [
        {
          security: TSLA._id,
          averagePrice: 100,
          costBasis: 340,
          quantity: 3.4,
          source: HoldingSource.direct,
          type: HoldingType.shares,
          direction: HoldingDirection.long,
        },
        {
          security: TSLA._id,
          averagePrice: 730,
          costBasis: 730,
          quantity: 1,
          source: HoldingSource.direct,
          type: HoldingType.shares,
          direction: HoldingDirection.long,
        },
      ];

      const merged = service.getMergedHoldings(preMerged);

      expect(merged).toHaveLength(1);

      expect(merged).toEqual([
        {
          ...preMerged[0],
          averagePrice: 243.18,
          costBasis: 1070,
          quantity: 4.4,
        },
      ]);
    });

    it('should work with duplicate SHORT holdings', () => {
      const preMerged: HoldingFromDb[] = [
        {
          security: NET._id,
          averagePrice: 340,
          costBasis: 340,
          quantity: -1,
          source: HoldingSource.broker,
          direction: HoldingDirection.short,
        },
        {
          security: NET._id,
          averagePrice: 340,
          costBasis: 340,
          quantity: -2,
          source: HoldingSource.broker,
          direction: HoldingDirection.short,
        },
      ];

      const merged = service.getMergedHoldings(preMerged);

      expect(merged).toHaveLength(1);

      expect(merged).toEqual([
        {
          ...preMerged[0],
          costBasis: 680,
          averagePrice: -226.67,
          quantity: -3,
        },
      ]);
    });
  });
});
