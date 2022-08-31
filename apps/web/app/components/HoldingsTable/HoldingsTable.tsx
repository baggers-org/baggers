import { DataGridPro } from '@mui/x-data-grid-pro';
import { useTableColumns } from './useTableColumns';

import { HoldingsTableProps, UseTableColumnProps } from './types';

export const HoldingsTable: React.FC<
  HoldingsTableProps & UseTableColumnProps
> = ({ holdings, density, ...tableColumnProps }) => {
  console.log(holdings);

  return (
    <DataGridPro
      rows={holdings || []}
      rowHeight={60}
      checkboxSelection
      columnVisibilityModel={{
        source: false,
      }}
      initialState={{
        sorting: { sortModel: [{ field: `marketValue`, sort: `desc` }] },
      }}
      sx={{ fontSize: '1rem' }}
      density={density}
      columns={useTableColumns({ ...tableColumnProps })}
      getRowId={(row) => row._id}
    />
  );
};
