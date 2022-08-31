import { Transaction, TransactionType } from '@baggers/sdk';
import { Typography, useTheme } from '@mui/material';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { getSecuritySymbol } from '~/util/getSecuritySymbol';
import { SecurityLogo } from '../SecurityLogo';

export const TransactionsTable: React.FC<{
  transactions: Transaction[];
}> = ({ transactions }) => {
  const { t } = useTranslation('transactions');

  const theme = useTheme();

  const renderType = (transaction: Transaction) => {
    const text = transaction.subType.toUpperCase();
    switch (transaction.type) {
      case TransactionType.Cash:
      case TransactionType.Buy: {
        return (
          <Typography fontWeight="bold" color={theme.palette.success.main}>
            {text}
          </Typography>
        );
      }
      case TransactionType.Sell: {
        return (
          <Typography fontWeight="bold" color={theme.palette.error.main}>
            {text}
          </Typography>
        );
      }
    }
  };

  return (
    <DataGridPro
      rows={transactions || []}
      initialState={{
        sorting: { sortModel: [{ field: `date`, sort: `desc` }] },
      }}
      sx={{ fontSize: '1rem' }}
      rowHeight={70}
      columns={[
        {
          field: 'date',
          headerName: t('date', 'Date'),
          renderCell: ({ row }) => format(new Date(row.date), 'do LLL yy'),
          flex: 0.75,
        },
        {
          field: 'type',
          headerName: t('type', 'Type'),
          renderCell: ({ row }) => renderType(row),
          flex: 0.5,
        },
        {
          field: 'name',
          headerName: t('name', 'Name'),
          flex: 3,
        },
        {
          headerName: t('amount', 'Amount'),
          field: 'amount',
          flex: 1,
        },
        {
          headerName: t('security', 'Security'),
          field: 'security.symbol',
          flex: 1,
          renderCell: ({ row }) => (
            <SecurityLogo
              symbol={getSecuritySymbol(row.security || row.importedSecurity)}
              existsInDatabase={!!row.security}
              includeSecurityLink
            />
          ),
        },
      ]}
      getRowId={(row) => row._id}
    />
  );
};
