import { DataGridPro } from '@mui/x-data-grid-pro';
import { useTableColumns } from './useTableColumns';

import { PositionsTableProps, UseTableColumnProps } from './types';
import { getLoadingRows } from './loadingRows';

export const PositionsTable: React.FC<
  PositionsTableProps & UseTableColumnProps
> = ({ positions, numberOfPositions, density, ...tableColumnProps }) => {
  return (
    <DataGridPro
      rows={positions || getLoadingRows(numberOfPositions)}
      checkboxSelection
      density={density}
      columns={useTableColumns({ ...tableColumnProps })}
      getRowId={(row) => row._id}
    />
  );
};
