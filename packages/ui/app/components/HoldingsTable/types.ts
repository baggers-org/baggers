import { DataGridProProps } from '@mui/x-data-grid-pro';
import { Holding } from '~/generated/graphql';

export interface HoldingsTableProps {
  holdings?: Holding[];
  density: DataGridProProps['density'];
}

export interface UseTableColumnProps {
  onRemoveHolding?: (holding: Holding) => void;
}
