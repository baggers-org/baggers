import { Position } from '@/graphql/Mutations.document.gql';
import { DataGridProProps } from '@mui/x-data-grid-pro';

export interface PositionsTableProps {
  positions: Position[];
  density: DataGridProProps['density'];
}

export interface UseTableColumnProps {
  onRemovePosition?: (position: Position) => void;
  numberOfPositions: number;
}
