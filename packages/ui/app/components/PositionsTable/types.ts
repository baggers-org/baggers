import { DataGridProProps } from '@mui/x-data-grid-pro';
import { Position } from '~/generated/graphql';

export interface PositionsTableProps {
  positions?: Position[];
  density: DataGridProProps['density'];
}

export interface UseTableColumnProps {
  onRemovePosition?: (position: Position) => void;
}
