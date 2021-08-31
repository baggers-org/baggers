import { KeyboardEventHandler, useState } from 'react';
import { Position, Symbol } from '@/graphql/Queries.document.gql';
import useEditPortfolio from '@/hooks/useEditPortfolio';
import { Grid, Typography } from '@material-ui/core';
import SearchSymbols from '../SearchSymbols/SearchSymbols';
import AddPositionModal from '../AddPositionModal/AddPositionModal';
import BaggersTable from '../BaggersTable/BaggersTable';

type Props = {
  portfolioId?: string;
};
const PortfolioWizardAddPositions: React.FC<Props> = ({ portfolioId }) => {
  const { portfolio, addPosition, removePositions } = useEditPortfolio(
    portfolioId,
  );

  const [
    addingPositionForSymbol,
    setAddingPositionForSymbol,
  ] = useState<Symbol>();
  const [isSearchFocused, setIsSearchFocused] = useState(true);
  const [searchTerm, setSearchTerm] = useState(``);
  /**
   * Kicks off the process of adding position data. Will display a basic input at first
   * with the option of expanding to advanced options
   * @param ticker Ticker from search results
   */
  const onBeginAddNewPosition = (symbol: Symbol) => {
    setAddingPositionForSymbol(symbol);
    setIsSearchFocused(false);
  };

  const onPositionAdded = (position: Position) => {
    console.log(position);

    if (addPosition) {
      addPosition(position).then(() => {
        setAddingPositionForSymbol(undefined);
      });
    }
    setIsSearchFocused(true);
    setSearchTerm(``);
  };

  const resetForm = () => {
    setAddingPositionForSymbol(undefined);
    setSearchTerm(``);
    setIsSearchFocused(true);
  };
  const handleEscapeKey: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === `Escape`) {
      resetForm();
    }
  };

  if (!portfolio) {
    return null;
  }

  return (
    <Grid container onKeyDown={handleEscapeKey}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">ADD POSITIONS</Typography>
      </Grid>

      <Grid item xs={12}>
        <SearchSymbols
          searchTerm={searchTerm}
          onSearchTermChanged={(term) => {
            setSearchTerm(term);
            setAddingPositionForSymbol(undefined);
          }}
          onSymbolAdded={onBeginAddNewPosition}
          focused={isSearchFocused}
        />
        <AddPositionModal
          onPositionAdded={onPositionAdded}
          symbol={addingPositionForSymbol}
          open={!!addingPositionForSymbol}
          onClose={resetForm}
        />
      </Grid>
      <Grid item xs={12}>
        {portfolio.positions?.items ? (
          <BaggersTable
            disableSorting
            tableTitle="Positions"
            objects={portfolio.positions.items}
            page={1}
            onChangePage={console.log}
            onToolbarAction={(action, payload) => {
              if (action === `DELETE_SELECTED`) {
                if (removePositions) {
                  removePositions(payload);
                }
              }
            }}
            allowRowSelection
            properties={[
              {
                id: `symbol.symbol`,
                label: `Symbol`,
                align: `left`,
                renderCell: (pos: Position) => (
                  <span>{pos.symbol?.symbol}</span>
                ),
              },
              {
                id: `numberOfShares`,
                key: `numberOfShares`,
                label: `No. Shares`,
              },
              {
                id: `averagePrice`,
                key: `averagePrice`,
                label: `Average Price ($)`,
              },
              {
                id: `costBasis`,
                key: `costBasis`,
                label: `Cost Basis`,
              },
              {
                id: `marketValue`,
                key: `marketValue`,
                label: `Mkt. Value`,
              },

              {
                id: `symbol.quote.latestPrice`,
                label: `Price`,
                renderCell: (pos) => (
                  <span>{pos.symbol?.quote?.latestPrice}</span>
                ),
              },
            ]}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PortfolioWizardAddPositions;
