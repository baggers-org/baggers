import { User } from '@baggers/graphql-types';
import { Theme } from '~/components/theme';

export interface RootData {
  user: User | null;
  theme: Theme | null;
}
