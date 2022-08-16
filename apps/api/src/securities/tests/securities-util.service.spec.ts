import { Test } from '@nestjs/testing';
import { OpenFigiMappingResponse, OpenFigiModule } from '~/open-figi';
import { ImportedDBLTX, ImportedSBSI, SBSI } from '../data';
import { SecuritiesServiceMock } from '../mocks';
import { SecuritiesUtilService } from '../securities-util.service';
import { SecuritiesService } from '../securities.service';
import AxiosMock from 'axios-mock-adapter';
import axios from 'axios';

const mock = new AxiosMock(axios);

describe('Securities Util Service', () => {
  let service: SecuritiesUtilService;
  beforeAll(async () => {
    const mod = await Test.createTestingModule({
      imports: [OpenFigiModule],
      providers: [SecuritiesUtilService, SecuritiesService],
    })
      .overrideProvider(SecuritiesService)
      .useClass(SecuritiesServiceMock)
      .compile();

    service = mod.get<SecuritiesUtilService>(SecuritiesUtilService);
  });
  describe('importedToBaggersSecurities', () => {
    it('when OpenFIGI returns figis, and the matching security exists in our DB it should be returned by this function', async () => {
      mock.onPost().replyOnce<OpenFigiMappingResponse>(200, [
        {
          data: [
            {
              figi: SBSI.figi,
              exchCode: '',
              name: '',
              ticker: '',
            },
          ],
        },
      ]);
      // Test with duplicates
      const securities = await service.importedToBaggersSecurities([
        ImportedSBSI,
        ImportedSBSI,
      ]);

      // We can import SBSI successfully because we have listed it in our data/security.test-data.ts
      expect(securities.get(ImportedSBSI)).toEqual(SBSI);
    });

    it('when OpenFIGI returns figis, but the symbol does not exist in our database, this function should return undefined', async () => {
      mock.onPost().replyOnce<OpenFigiMappingResponse>(200, [
        {
          data: [
            {
              figi: 'some figi that we dont have',
              exchCode: '',
              name: '',
              ticker: '',
            },
          ],
        },
      ]);
      // Test with duplicates
      const securities = await service.importedToBaggersSecurities([
        ImportedDBLTX,
        ImportedDBLTX,
        ImportedDBLTX,
      ]);
      expect(securities.get(ImportedDBLTX)).toBeUndefined();
    });

    describe('Failures', () => {
      it('when OpenFIGI does not return a FIGI for a particular security, we should still resort to searching our database', async () => {
        mock.onPost().replyOnce<OpenFigiMappingResponse>(200, [
          {
            warning: 'Could not find FIGI for SBSI',
          },
        ]);

        const securities = await service.importedToBaggersSecurities([
          ImportedSBSI,
        ]);

        expect(securities.get(ImportedSBSI)).toEqual(SBSI);
      });

      it('when OpenFIGI is unavailable we should still resort to searching our database', async () => {
        mock.onPost().networkError();
        const securities = await service.importedToBaggersSecurities([
          ImportedSBSI,
        ]);

        expect(securities.get(ImportedSBSI)).toEqual(SBSI);
      });
    });
  });
});
