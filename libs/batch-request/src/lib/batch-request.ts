export type BatchableFn<TResult> = () => Promise<TResult>;

/**
 *
 * @param batchedFunctions An array of functions that perform tasks that
 * should be batched
 * @param batchSize
 * @returns
 */
export async function batchRequest<TResult>(
  batchedFunctions: BatchableFn<TResult>[],
  batchSize = 1000
): Promise<Awaited<TResult[]>> {
  let remaining = batchedFunctions.length;
  let results: TResult[] = [];

  while (remaining > 0) {
    const batchStart = batchedFunctions.length - remaining;
    const batchEnd = batchStart + Math.min(batchSize, remaining);
    const batch = batchedFunctions.slice(batchStart, batchEnd);
    let errors = 0;
    console.log(batch.length);

    console.log('Fetching batch of ', batch.length, '...');
    const t = Date.now();

    results = [
      ...results,
      ...(await Promise.all(
        batch.map(async (t) => {
          return t()
            .then((results) => {
              remaining -= 1;
              return results;
            })
            .catch((e) => {
              console.error(e);
              remaining -= 1;
              errors += 1;
              return null;
            });
        })
      )),
    ].filter((r) => !!r);

    console.log('Fetch finished');
    console.table({
      batchTime: (Date.now() - t) / 1000,
      errors,
    });
    console.log(
      'Total fetched ',
      batchedFunctions.length - remaining,
      ' / ',
      batchedFunctions.length
    );
  }

  return results;
}
