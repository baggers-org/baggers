import { Warning } from '@mui/icons-material';
import {
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
} from '@mui/material';
import { Form, useFetcher } from '@remix-run/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionTitle } from '~/components/SectionTitle';
import { useIdParam } from '~/hooks';

export type DeletePortfolioProps = {};
export const DeletePortfolio: React.FC<DeletePortfolioProps> = () => {
  const { t } = useTranslation(`portfolio_settings`);
  const fetcher = useFetcher();
  const id = useIdParam();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <>
      <SectionTitle mb={2}>
        {t(`delete_portfolio`, `Delete Portfolio`)}
      </SectionTitle>
      <Stack direction="row" gap={1} mb={4}>
        <Warning />
        {t(`delete_warning`, `Warning this action cannot be undone.`)}
      </Stack>
      <Button
        color="error"
        variant="contained"
        onClick={() => setShowConfirmDelete(true)}
      >
        {t(`Delete portfolio`)}
      </Button>
      <Dialog open={showConfirmDelete}>
        <DialogTitle>
          {t(`are_you_sure`, `Are you sure you want to delete this portfolio?`)}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t(`this_action`, `This action cannot be undone.`)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDelete(false)}>
            {t(`no_take_me_back`, `No take me back`)}
          </Button>
          <Form method="delete">
            <Button color="error" type="submit" variant="outlined">
              {t(`yes_delete_it`, `Yes delete it`)}
            </Button>
          </Form>
        </DialogActions>
      </Dialog>
    </>
  );
};
