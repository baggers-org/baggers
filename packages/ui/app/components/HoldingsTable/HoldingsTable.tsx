import { DataGridPro } from '@mui/x-data-grid-pro';
import { useTableColumns } from './useTableColumns';

import { HoldingsTableProps, UseTableColumnProps } from './types';

export const HoldingsTable: React.FC<
  HoldingsTableProps & UseTableColumnProps
> = ({ holdings, density, ...tableColumnProps }) => {
  return (
    <DataGridPro
      rows={holdings || []}
      checkboxSelection
      density={density}
      columns={useTableColumns({ ...tableColumnProps })}
      getRowId={(row) => row._id}
    />
  );
};
