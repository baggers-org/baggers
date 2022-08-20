import { DataGridProProps } from '@mui/x-data-grid-pro';
import { Holding } from '@baggers/sdk';

export interface HoldingsTableProps {
  holdings?: Holding[];
  density: DataGridProProps['density'];
}

export interface UseTableColumnProps {
  onRemoveHolding?: (holding: Holding) => void;
}
