import { useTranslation } from 'next-i18next';
import { PositionType } from '../types';

export const useTranslatedPositionType = (positionType: PositionType) => {
  const { t } = useTranslation(`view_portfolio`);
  if (positionType === `calls`) return t(`calls`, `calls`);
  if (positionType === `puts`) return t(`puts`, `puts`);

  return t(`shares`, `shares`);
};
