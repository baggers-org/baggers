import { AddLink, Delete, GroupAdd, PlaylistAdd } from '@mui/icons-material';
import { Skeleton, Tooltip } from '@mui/material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid-pro';

import { useTranslation } from 'react-i18next';
import { HoldingSource } from '~/generated/graphql';
import { formatCurrency } from '~/util';
import { PriceTag } from '..';
import { SymbolLogo } from '../SymbolLogo';
import { UseTableColumnProps } from './types';

export const useTableColumns = ({
  onRemoveHolding,
}: UseTableColumnProps): GridColDef[] => {
  const { t } = useTranslation(`holdings`);

  return [
    {
      field: `symbol`,
      headerName: t(`instrument`, `Instrument`),
      flex: 1,
      valueGetter: ({ row }) => row?.symbol?.symbol,
      renderCell: ({ row }) =>
        row?.symbol ? <SymbolLogo symbol={row.symbol} /> : <Skeleton />,
    },
    {
      field: `marketValue`,
      renderCell: ({ row }) => formatCurrency(row?.marketValue),
      flex: 1,
      headerName: t(`marketValue`, `Market value`),
    },
    {
      field: `costBasis`,
      renderCell: ({ row }) => formatCurrency(row?.costBasis),
      flex: 1,
      headerName: t(`costBasis`, `Cost basis`),
    },
    {
      field: `averagePrice`,
      renderCell: ({ row }) => formatCurrency(row?.averagePrice),
      flex: 1,
      headerName: t(`averagePrice`, `Average price`),
    },
    {
      field: `symbol.quote.latestPrice`,
      valueGetter: ({ row }) => row.symbol.quote.latestPrice,
      headerName: `${t(`price`, `Price`)}`,
      flex: 1,
      renderCell: ({ row }) => {
        return formatCurrency(row?.symbol?.quote?.latestPrice);
      },
    },
    {
      field: `change%`,
      valueGetter: ({ row }) => row.symbol.quote.changePercent,
      headerName: `${t(`change`, `Change`)} %`,
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <PriceTag value={row.symbol.quote.changePercent * 100} isPercent />
        );
      },
    },
    {
      field: `profitLossPercent`,
      headerName: `${t(`profit_loss`, `Profit/Loss`)} %`,
      flex: 1,
      valueGetter: ({ row }) => row?.profitLossPercent,
      renderCell: ({ row }) => (
        <PriceTag value={row.profitLossPercent} isPercent />
      ),
    },
    {
      field: `profitLossUsd`,
      flex: 1,
      headerName: `${t(`profit_loss`, `Profit/Loss`)}`,
      renderCell: ({ row }) => <PriceTag value={row.profitLossUsd} />,
    },
    {
      field: `dailyProfitLossUsd`,
      flex: 1,
      headerName: `${t(`profit_loss`, `Daily P/L`)}`,
      renderCell: ({ row }) => <PriceTag value={row.dailyProfitLossUsd} />,
    },
    {
      field: `source`,
      headerName: `${t(`source`, `Source`)}`,
      align: `center`,
      headerAlign: `center`,
      renderCell: ({ row }) => {
        if (row.source === HoldingSource.Direct) {
          return (
            <Tooltip
              title={t(
                `direct_tooltip`,
                `This holding has been added manually and will not contribute to analytics`,
              )}
            >
              <GroupAdd
                aria-label={t(`direct_holding`, `direct holding source`)}
              />
            </Tooltip>
          );
        }

        if (row.source === HoldingSource.Broker) {
          return (
            <Tooltip
              title={t(
                `broker_tooltip`,
                `This holding has been added via a linked brokerage account and is contributing to analytics.`,
              )}
            >
              <AddLink
                aria-label={t(`broker_holding`, `broker holding source`)}
              />
            </Tooltip>
          );
        }

        if (row.source === HoldingSource.Transactions) {
          return (
            <Tooltip
              title={t(
                `transaction_tooltip`,
                `This holding has been generated from transaction data and is contributing to analytics.`,
              )}
            >
              <PlaylistAdd
                aria-label={t(`broker_holding`, `broker holding source`)}
              />
            </Tooltip>
          );
        }

        return null;
      },
    },
    {
      field: `actions`,
      width: 79,
      type: `actions`,

      // eslint-disable-next-line
      // @ts-ignore
      getActions: ({ row: holding }) => [
        <GridActionsCellItem
          icon={<Delete />}
          label={t(`remove_holding`, `Remove holding`)}
          onClick={() => onRemoveHolding?.(holding)}
        />,
      ],
    },
  ];
};
