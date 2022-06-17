import { useTranslation } from 'react-i18next';
import { HoldingType } from '~/generated/graphql';

export const useTranslatedHoldingType = (
  type: HoldingType,
  size = 2,
) => {
  const { t } = useTranslation(`view_portfolio`);
  let returnString = t(`shares`, `shares`);
  if (type === `calls`) {
    returnString = t(`calls`, `calls`);
  }
  if (type === `puts`) {
    returnString = t(`puts`, `puts`);
  }

  if (size > 1) {
    return returnString;
  }

  return returnString.substring(0, returnString.length - 1);
};
