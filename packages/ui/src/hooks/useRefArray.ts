import { createRef, RefObject, useEffect, useState } from 'react';

export function useRefArray<TElement>(
  numberOfRefs: number,
): RefObject<TElement>[] {
  const [refs, setRefs] = useState<Array<any>>([]);
  useEffect(() => {
    setRefs(new Array(numberOfRefs).fill(createRef()));
  }, [numberOfRefs]);

  return refs;
}
