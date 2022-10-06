import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { usePortfolio } from '~/hooks/usePortfolio';
import { OverviewCard } from './OverviewCard';
import { EditableTypography } from '~/components/EditableTypography';
import { useFetcher } from '@remix-run/react';
import { Edit } from 'tabler-icons-react';
import { useState } from 'react';

export const FromTheAuthor = () => {
  const { t } = useTranslation('portfolio_overview');
  const { description, _id } = usePortfolio();
  const fetcher = useFetcher();

  const [isEditting, setIsEditting] = useState(false);
  return (
    <OverviewCard
      title={
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant={'subtitle1'}>
            {t('about_portfolio', 'About this portfolio')}
          </Typography>
          <IconButton onClick={() => setIsEditting((e) => !e)}>
            <Edit />
          </IconButton>
        </Box>
      }
    >
      <Box display="flex">
        <Avatar sx={{ height: 64, width: 64, mr: 2 }}>
          <img
            src="https://source.unsplash.com/128x128/?headshot"
            loading="lazy"
          />
          <Skeleton />
        </Avatar>
        <EditableTypography
          hideEditControls
          isEditMode={isEditting}
          sx={{ float: 'right' }}
          name="description"
          placeholder={t(`describe_portfolio`, `Enter a portfolio description`)}
          onFinishEdit={(description) =>
            fetcher.submit(
              { description },
              { method: `patch`, action: `/portfolios/${_id}` }
            )
          }
          variant="body2"
          value={
            (fetcher?.submission?.formData?.get(`description`) as string) ||
            description
          }
        />
      </Box>
    </OverviewCard>
  );
};
