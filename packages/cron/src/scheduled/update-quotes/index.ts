import { cronFetch } from '@/util/cronFetch';
import { log } from '@/util/logger';

// learn more about scheduled functions here: https://arc.codes/scheduled
export async function updateQuotes() {
  log('Updating quotes');
  const res = await cronFetch(`/updateQuotes`, { method: `post` });

  if (!res.ok) {
    console.error(res);
    throw Error('There was an error updating quotes');
  }
}
