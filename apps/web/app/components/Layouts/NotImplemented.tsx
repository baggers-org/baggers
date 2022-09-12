import { Alert, AlertTitle } from '@mui/material';
import { PageLayout } from './PageLayout';

export default function NotImplemented() {
  return (
    <PageLayout>
      <Alert color="warning">
        <AlertTitle>This feature has not yet been implemented.</AlertTitle>
        Check back later.
      </Alert>
    </PageLayout>
  );
}
