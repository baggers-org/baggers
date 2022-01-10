import { isProfitLossOrNeutral } from '@/util';
import { Delete } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-pro';
import { useTranslation } from 'next-i18next';
import { PriceTag } from '..';
import { UseTableColumnProps } from './types';

const renderPriceDeltaCell = (value: number) => {
  if (!value) {
    return <Skeleton width="100%" />;
  }
  return <PriceTag color={isProfitLossOrNeutral(value)}>{value}</PriceTag>;
};

const renderValueOrSkeleton = (value) => {
  if (!value) {
    return <Skeleton width="100%" />;
  }

  return value;
};
export const useTableColumns = ({
  onRemovePosition,
}: UseTableColumnProps): GridColDef[] => {
  const { t } = useTranslation();
  return [
    {
      field: `symbol`,
      headerName: t(`instrument`, `Instrument`),
      flex: 1,
      valueGetter: ({ row }) => row?.symbol?.symbol,
      renderCell: ({ row }) => renderValueOrSkeleton(row?.symbol?.symbol),
    },
    {
      field: `marketValue`,
      renderCell: ({ row }) => renderValueOrSkeleton(row?.marketValue),
      flex: 1,
      headerName: t(`marketValue`, `Market value`),
    },
    {
      field: `costBasis`,
      renderCell: ({ row }) => renderValueOrSkeleton(row?.costBasis),
      flex: 1,
      headerName: t(`costBasis`, `Cost basis`),
    },
    {
      field: `averagePrice`,
      renderCell: ({ row }) => renderValueOrSkeleton(row?.averagePrice),
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
        return row?.symbol?.quote?.latestPrice;
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
        return row?.symbol?.quote?.latestPrice;
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
