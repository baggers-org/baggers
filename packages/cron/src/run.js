import { updateQuotes } from './scheduled/update-quotes';
import { updateSymbols } from './scheduled/update-symbols';

const run = async () => {
//   await updateSymbols();
  await updateQuotes();
};

run();
