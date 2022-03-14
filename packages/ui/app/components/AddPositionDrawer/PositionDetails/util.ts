import { useTranslation } from 'react-i18next';
import { PositionType } from '~/generated/graphql';

export const useTranslatedPositionType = (
  positionType: PositionType,
  size = 2,
) => {
  const { t } = useTranslation(`view_portfolio`);
  let returnString = t(`shares`, `shares`);
  if (positionType === `calls`) {
    returnString = t(`calls`, `calls`);
  }
  if (positionType === `puts`) {
    returnString = t(`puts`, `puts`);
  }

  if (size > 1) {
    return returnString;
  }

  return returnString.substring(0, returnString.length - 1);
};
