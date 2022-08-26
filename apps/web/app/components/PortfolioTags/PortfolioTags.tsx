import { Link } from '@mui/icons-material';
import { Chip, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PortfoliosCreatedQuery, PortfoliosFindByIdQuery } from '@baggers/sdk';

export interface PortfolioTagsProps {
  portfolio:
    | PortfoliosFindByIdQuery['portfoliosFindById']
    | PortfoliosCreatedQuery['portfoliosCreated'][number];
}
export const PortfolioTags: React.FC<PortfolioTagsProps> = ({ portfolio }) => {
  const { t } = useTranslation();
  return (
    <Stack direction="row">
      {portfolio?.plaidAccount ? (
        <Chip label={t(`linked`, `Linked`)} icon={<Link />} />
      ) : null}
    </Stack>
  );
};
