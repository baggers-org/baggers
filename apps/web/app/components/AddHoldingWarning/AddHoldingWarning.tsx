import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Form, Link, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '~/hooks/useAppStore';

export function AddHoldingWarning() {
  const { t } = useTranslation(`holdings`);
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const onboarding = useAppStore()?.onboarding;

  useEffect(() => {
    if (!onboarding?.hideDirectHoldingAddWarning) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        {t(`manual_warning_title`, `Add a holding directly?`)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            `direct_warning_text_1`,
            `Adding a holding directly is intended to make the process of creating a portfolio easier, however `,
          )}
          <strong>
            {t(
              `direct_warning_text_2`,
              `holdings that are added directly will not be included in performance analytics.`,
            )}
          </strong>
        </DialogContentText>
        <DialogContentText sx={{ mt: 5 }}>
          {t(
            `manual_warning_text_2`,
            `If you wish to utilise our analytics on this position you should use the`,
          )}
          <Link to={`/portfolios/${id}/transactions`}>
            {` `}
            {t(`transactions_tab`, `Transactions tab`)}
          </Link>
          {` `}
          {t(`instead`, `instead.`)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Form
          action={`/portfolios/${id}/holdings/add/warning`}
          method="post"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <input type="hidden" value="true" name="hide" />
          <Button type="submit">
            {t(`never_show_me_this_again`, `Never show me this again`)}
          </Button>
        </Form>
        <Form action={`/portfolios/${id}/holdings/add/warning`} method="post">
          <Button
            type="submit"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {t(`i_understand`, `I understand`)}
          </Button>
        </Form>
      </DialogActions>
    </Dialog>
  );
}
