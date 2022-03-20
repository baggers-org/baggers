import { Link } from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Portfolio } from '~/generated/graphql';

export interface PortfolioTagsProps {
  portfolio: Portfolio;
}
export const PortfolioTags: React.FC<PortfolioTagsProps> = ({ portfolio }) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row">
      {portfolio?.plaid?.isLinked ? (
        <Chip label={t(`linked`, `Linked`)} icon={<Link />} />
      ) : null}
    </Stack>
  );
};
