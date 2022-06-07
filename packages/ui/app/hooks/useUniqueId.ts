import { useEffect, useState } from 'react';

export const useUniqueId = () => {
  const [id, setId] = useState<string | undefined>();
  useEffect(() => {
    setId(Math.random().toString(36).substring(7));
  }, []);

  return id;
};
