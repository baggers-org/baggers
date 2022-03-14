import { useParams } from '@remix-run/react';
import { useMemo } from 'react';

export const useIdParam = (): string | undefined => {
  const { id } = useParams();
  return useMemo(() => {
    if (Array.isArray(id)) {
      return id[0];
    }
    return id;
  }, [id]);
};
