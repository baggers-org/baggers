import { cronFetch } from '@/util/cronFetch';
import { log } from '@/util/logger';

// learn more about scheduled functions here: https://arc.codes/scheduled
export async function updateSymbols() {
  log('Updating symbols');

  await cronFetch(`/updateSymbols`, { method: `post` });
}
