import { useTranslation } from 'react-i18next';

export const Namespaces = ['common', 'portfolio_tracker'] as const;

export const useT = (namespace: typeof Namespaces[number]) => {
  const { t } = useTranslation(namespace);

  return t as (key: string, def: string) => string;
};
