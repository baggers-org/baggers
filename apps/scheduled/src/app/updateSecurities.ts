import { Security } from '@baggers/sdk';
import { iexFetch } from '../util/iexFetch';
import { baggersDb } from '../util/mongo';

export const updateSecurities = async () => {
  console.log('[updateSecurities] Begin');

  const { data: symbols } = await iexFetch<Security[]>('/ref-data/symbols');

  const t = Date.now();
  console.log(
    `[updateSecurities] Updating securities collection for `,
    symbols.length,
    ` symbols retrieved from IEX cloud.`
  );

  const ops = symbols.map((s) => ({
    updateOne: {
      // Update
      filter: { symbol: s.symbol, exchange: s.exchange },
      update: {
        $set: {
          ...s,
          updateAt: new Date(),
        } as any,
      },
      upsert: true,
    },
  }));

  const writeResult = await baggersDb().collection('securities').bulkWrite(ops);

  console.log(writeResult);

  console.log(
    '[updateSecurities] Succesfully updated in ',
    (Date.now() - t) / 1000,
    ' seconds.'
  );
  console.log('[updateSecurities] Finish');
};
