import { formatCurrency, isProfitLossOrNeutral } from '@/util';
import { Delete } from '@mui/icons-material';
import { Avatar, Link, Skeleton, Stack, useTheme } from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-pro';
import { useTranslation } from 'next-i18next';

import NextLink from 'next/link';
import { PriceTag } from '..';
import { UseTableColumnProps } from './types';

const renderPriceDeltaCell = (
  value: number,
  { isPercent } = { isPercent: false },
) => {
  if (!value) {
    return <Skeleton width="100%" />;
  }

  const delta = isProfitLossOrNeutral(value);
  let formattedValue = isPercent
    ? `${Math.abs(value)}%`
    : formatCurrency(value);

  formattedValue = `${value > 0 ? `+` : `-`} ${formattedValue}`;

  return <PriceTag color={delta}>{formattedValue}</PriceTag>;
};

const renderMonetaryValue = (value: number) => {
  if (!value) {
    return <Skeleton width="100%" />;
  }
  return formatCurrency(value);
};
export const useTableColumns = ({
  onRemovePosition,
}: UseTableColumnProps): GridColDef[] => {
  const { t } = useTranslation();

  const theme = useTheme();
  return [
    {
      field: `symbol`,
      headerName: t(`instrument`, `Instrument`),
      flex: 1,
      valueGetter: ({ row }) => row?.symbol?.symbol,
      renderCell: ({ row }) =>
        row?.symbol ? (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
                fontSize: 14,
              }}
            >
              {row?.symbol?.symbol?.slice(0, 2)}
            </Avatar>
            <Link sx={{ fontWeight: `bold` }}>
              <NextLink href={`/stock/${row?.symbol?.symbol}`}>
                {row?.symbol?.symbol}
              </NextLink>
            </Link>
          </Stack>
        ) : (
          <Skeleton />
        ),
    },
    {
      field: `marketValue`,
      renderCell: ({ row }) => renderMonetaryValue(row?.marketValue),
      flex: 1,
      headerName: t(`marketValue`, `Market value`),
    },
    {
      field: `costBasis`,
      renderCell: ({ row }) => renderMonetaryValue(row?.costBasis),
      flex: 1,
      headerName: t(`costBasis`, `Cost basis`),
    },
    {
      field: `averagePrice`,
      renderCell: ({ row }) => renderMonetaryValue(row?.averagePrice),
      flex: 1,
      headerName: t(`averagePrice`, `Average price`),
    },
    {
      field: `price`,
      headerName: `${t(`price`, `Price`)}`,
      flex: 1,
      renderCell: ({ row }) => {
        if (!row.symbol?.quote) {
          return <Skeleton width="100%" />;
        }
        return renderMonetaryValue(row?.symbol?.quote?.latestPrice);
      },
    },
    {
      field: `change%`,
      headerName: `${t(`change`, `Change`)} %`,
      flex: 1,
      renderCell: ({ row }) => {
        if (!row.symbol?.quote) {
          return <Skeleton width="100%" />;
        }
        return renderPriceDeltaCell(row?.symbol?.quote?.changePercent, {
          isPercent: true,
        });
      },
    },
    {
      field: `pl%`,
      headerName: `${t(`profit_loss`, `Profit/Loss`)} %`,
      flex: 1,
      valueGetter: ({ row }) => row?.profitLossPercent,
      renderCell: ({ row }) => renderPriceDeltaCell(row?.profitLossPercent),
    },
    {
      field: `pl`,
      flex: 1,
      headerName: `${t(`profit_loss`, `Profit/Loss`)}`,
      renderCell: ({ row }) => renderPriceDeltaCell(row?.profitLossUsd),
    },
    {
      field: `dailyPl`,
      flex: 1,
      headerName: `${t(`profit_loss`, `Profit/Loss`)}`,
      renderCell: ({ row }) => renderPriceDeltaCell(row?.profitLossUsd),
    },
    {
      field: `actions`,
      width: 79,
      type: `actions`,

      // eslint-disable-next-line
      // @ts-ignore
      getActions: ({ row: position }) => [
        <GridActionsCellItem
          icon={<Delete />}
          label={t(`remove_position`, `Remove position`)}
          onClick={() => onRemovePosition?.(position)}
        />,
      ],
    },
  ];
};
