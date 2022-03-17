import { cronFetch } from '@/util/cronFetch';

// learn more about scheduled functions here: https://arc.codes/scheduled
export async function scheduled(event) {
  const res = await cronFetch(`/updateSymbols`, { method: `post` });
}
