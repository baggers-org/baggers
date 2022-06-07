import { useEffect, useState } from 'react';

export const useUniqueId = () => {
  const [id, setId] = useState<string | undefined>();
  useEffect(() => {
    setId(`${Math.random() * Math.random()}`);
  }, []);

  return id;
};
