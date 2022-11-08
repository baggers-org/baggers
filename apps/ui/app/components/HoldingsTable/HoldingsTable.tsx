import { DataGridPro } from '@mui/x-data-grid-pro';
import { useTableColumns } from './useTableColumns';

import { HoldingsTableProps, UseTableColumnProps } from './types';

export const HoldingsTable: React.FC<
  HoldingsTableProps & UseTableColumnProps
> = ({ holdings, density }) => {
  return (
    <DataGridPro
      rows={holdings || []}
      rowHeight={60}
      initialState={{
        sorting: { sortModel: [{ field: `marketValue`, sort: `desc` }] },
        columns: {
          columnVisibilityModel: {
            source: false,
            brokerFees: false,
            lastMarketUpdate: false,
          },
        },
      }}
      sx={{
        fontSize: '1rem',
      }}
      density={density}
      columns={useTableColumns()}
      getRowId={(row) => row._id}
    />
  );
};
