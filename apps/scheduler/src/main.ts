import { getTickerInfo } from './getTickerInfo';
import { getTickerSnapshots } from './getTickerSnapshots';

const run = async () => {
  await getTickerInfo();
};

run();
