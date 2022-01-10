import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useDebouncedCallback } from 'use-debounce';

import { SearchInput } from '@/components/SearchInput';
import { useSearchSymbolsLazyQuery } from '@/graphql/Queries.document.gql';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { Box } from '@mui/material/node_modules/@mui/system';
import { Symbol } from '@/graphql/Mutations.document.gql';
import { BaggersToggleButtonGroup } from '@/components/BaggersToggleButtonGroup';

export interface SearchPositionsProps {
  onClickResult?: (position: Symbol) => void;
  addingSymbol: Symbol;
}
export const SearchPositions = ({ onClickResult, addingSymbol }) => {
  const [search, { data }] = useSearchSymbolsLazyQuery();

  const { t } = useTranslation(`view_portfolio`);

  const searchDebounce = useDebouncedCallback(search, 100);

  const results = data?.searchSymbols;

  return (
    <Box display={addingSymbol ? `none` : undefined} width="100%" px={5}>
      <Grid item xs={12} mt={3}>
        <SearchInput
          placeholder={t(`searc_symbols`, `Search symbols`)}
          autoFocus
          onChange={(val) =>
            searchDebounce({
              variables: {
                search: val.target.value,
              },
            })
          }
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
                onRowClick={({ row }) => onClickResult(row)}
              />
            </Box>
          )}
        </Grid>
      ) : null}
    </Box>
  );
};
