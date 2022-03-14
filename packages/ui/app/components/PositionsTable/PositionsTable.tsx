import { DataGridPro } from '@mui/x-data-grid-pro';
import { useTableColumns } from './useTableColumns';

import { PositionsTableProps, UseTableColumnProps } from './types';

export const PositionsTable: React.FC<
  PositionsTableProps & UseTableColumnProps
> = ({ positions, density, ...tableColumnProps }) => {
  return (
    <DataGridPro
      rows={positions || []}
      checkboxSelection
      density={density}
      columns={useTableColumns({ ...tableColumnProps })}
      getRowId={(row) => row._id}
    />
  );
};
