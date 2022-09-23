import { Alert, AlertTitle } from '@mui/material';
import { SectionTitle } from '../SectionTitle';
import { PageLayout } from './PageLayout';

export type NotImplementedProps = {
  title?: string;
};
export default function NotImplemented({ title }: NotImplementedProps) {
  return (
    <PageLayout>
      <SectionTitle>{title}</SectionTitle>
      <Alert color="warning">
        <AlertTitle>This feature has not yet been implemented.</AlertTitle>
        Check back later.
      </Alert>
    </PageLayout>
  );
}
