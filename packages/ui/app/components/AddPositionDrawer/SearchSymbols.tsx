import { Box, Divider, Grid, ToggleButton } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';

import { DataGridPro } from '@mui/x-data-grid-pro';
import { SearchInput } from '~/components/SearchInput';
import { BaggersToggleButtonGroup } from '~/components/BaggersToggleButtonGroup';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SearchSymbolsQuery, Symbol } from '~/generated/graphql';

export interface SearchPositionsProps {
  onClickResult?: (position: Symbol) => void;
  addingSymbol?: Symbol;
}
export const SearchSymbols: React.FC<SearchPositionsProps> = ({
  onClickResult,
  addingSymbol,
}) => {
  const { t } = useTranslation(`view_portfolio`);

  const [results, setResults] = useState<Symbol[]>();

  const searchDebounce = useDebouncedCallback(async (term: string) => {
    setResults(
      ((await (
        await fetch(`/api/symbols/${term}`)
      ).json()) as SearchSymbolsQuery)?.searchSymbols,
    );
  }, 100);

  return (
    <Box display={addingSymbol ? `none` : undefined} width="100%" px={5}>
      <Grid item xs={12} mt={3}>
        <SearchInput
          placeholder={t(`searc_symbols`, `Search symbols`)}
          autoFocus
          onChange={(e) => searchDebounce(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} mt={2}>
        <BaggersToggleButtonGroup color="primary" size="small" value="stocks">
          <ToggleButton value="stocks">{t(`stocks`, `Stocks`)}</ToggleButton>
          <ToggleButton value="etfs">{t(`etfs`, `ETFs`)}</ToggleButton>
          <ToggleButton value="futrues">{t(`futures`, `Futures`)}</ToggleButton>
        </BaggersToggleButtonGroup>
      </Grid>

      {results ? (
        <Grid item xs={12} height="100%" minHeight={300} mt={3}>
          <Divider />
          {results?.length === 0 && <>No results...</>}
          {results?.length && (
            <Box height="100%" mt={4}>
              <DataGridPro
                disableSelectionOnClick
                disableColumnMenu
                columns={[
                  {
                    field: `symbol`,
                    headerName: `Symbol`,
                    flex: 0.5,
                  },
                  {
                    field: `securityName`,
                    headerName: `Description`,
                    flex: 2,
                  },
                ]}
                getRowId={(row) => row._id}
                rows={results as any}
                onRowClick={({ row }) => onClickResult?.(row as Symbol)}
              />
            </Box>
          )}
        </Grid>
      ) : null}
    </Box>
  );
};
