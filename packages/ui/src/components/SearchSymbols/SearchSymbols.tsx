import { useDebouncedCallback } from 'use-debounce/lib';
import styled from 'styled-components';
import {
  useState,
  useRef,
  useEffect,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import { useSearchSymbolsLazyQuery } from '@/graphql/Queries.document.gql';
import { Symbol } from '@/graphql/Mutations.document.gql';
import { InputAdornment, Typography } from '@material-ui/core';
import { SearchRounded } from '@material-ui/icons';
import theme from '@/styles/theme';
import BaggersTextField from '../BaggersTextField/BaggersTextField';
import BaggersCircularProgress from '../BaggersCircularProgress/BaggersCircularProgress';

const Container = styled.form`
  width: 100%;
  position: relative;
  z-index: 999;
`;
const Results = styled.div`
  display: grid;
  background: ${theme.palette.background.paper};
  border-left: 1px solid ${theme.palette.grey[200]};
  border-right: 1px solid ${theme.palette.grey[200]};
  border-bottom: 1px solid ${theme.palette.grey[200]};
  position: absolute;
  z-index: 9999;
  top: 72px;
  width: 100%;
  box-sizing: border-box;
`;
const Result = styled.span`
  padding-left: 12px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 12px;
  height: ${theme.spacing(8)}px;
  display: grid;
  grid-template-columns: 0.5fr 4fr 0.25fr;
  grid-gap: 30px;
  grid-auto-flow: column;
  align-items: center;
  justify-items: left;
  justify-content: space-between;

  &:focus,
  &:hover {
    background-color: ${theme.palette.action.focus};
    > span {
      color: white;
    }
  }
`;

const NoResultsMessage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  height: ${theme.spacing(8)}px;
  width: 100%;
  text-align: center;
`;

interface Props {
  onSymbolAdded: (symbol: Symbol) => void;
  focused: boolean;
  searchTerm: string;
  onSearchTermChanged: (term: string) => void;
}
const SearchSymbols: React.FC<Props> = ({
  onSymbolAdded,
  focused,
  searchTerm,
  onSearchTermChanged,
}) => {
  const [fetchTickers, { data, loading }] = useSearchSymbolsLazyQuery();

  const [areResultsVisible, setAreResultsVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setAreResultsVisible(true);
    }
  }, [data, setAreResultsVisible]);

  const debounceFetch = useDebouncedCallback(fetchTickers, 500);

  const symbols = data?.searchSymbols as Symbol[];

  const resultsRef = useRef<any>();
  const searchInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();
  useEffect(() => {
    if (!searchInputRef.current) return;
    if (focused) {
      searchInputRef.current.focus();
    }
  }, [focused]);

  useEffect(() => {
    if (symbols?.length) {
      const firstResult = resultsRef.current
        ?.firstElementChild as HTMLSpanElement;
      if (!firstResult) return;
      firstResult.focus();
    }
  }, [symbols]);

  const handleSearchTermChanged: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const search = e?.target?.value;
    setAreResultsVisible(false);
    onSearchTermChanged(search);
    if (search && search !== ``) {
      debounceFetch({
        variables: {
          search,
        },
      });
    }
  };

  const isArrowKey = (key: string) =>
    [`ArrowDown`, `ArrowLeft`, `ArrowRight`, `ArrowUp`].includes(key);

  const isEnterKey = (key: string) => key === `Enter`;

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const pressedKey = event.key;
    if (!isArrowKey(pressedKey)) {
      searchInputRef.current?.focus();
    }
    const focusedResult = document.activeElement;
    if (pressedKey === `ArrowUp`) {
      const previousResult = focusedResult?.previousElementSibling as HTMLSpanElement;
      if (previousResult) {
        previousResult.focus();
      }
    }

    if (pressedKey === `ArrowDown`) {
      const nextResult = focusedResult?.nextElementSibling as HTMLSpanElement;
      if (nextResult) {
        nextResult.focus();
      }
    }
  };
  const onAddTicker = (symbol: Symbol) => {
    setAreResultsVisible(false);
    onSymbolAdded(symbol);
  };

  return (
    <Container
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <BaggersTextField
        label="Search symbols"
        value={searchTerm}
        fullWidth
        variant="outlined"
        margin="normal"
        onChange={handleSearchTermChanged}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRounded />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {loading ? <BaggersCircularProgress size="1.75rem" /> : null}
            </InputAdornment>
          ),
        }}
        inputRef={searchInputRef}
      />
      {symbols?.length === 0 && areResultsVisible ? (
        <Results>
          <NoResultsMessage>
            <Typography variant="body1">
              No symbols found for <strong>${searchTerm.toUpperCase()}</strong>
            </Typography>
          </NoResultsMessage>
        </Results>
      ) : null}
      {symbols?.length && searchTerm !== `` && areResultsVisible ? (
        <Results onKeyDown={onKeyDown} ref={resultsRef}>
          {symbols?.map((ticker, index) => (
            <Result
              id={`result-${index}`}
              role="button"
              key={`${ticker?.symbol} ${ticker?.exchange}`}
              tabIndex={0}
              onKeyDown={(event) => {
                if (isEnterKey(event.key)) {
                  onAddTicker(ticker);
                }
              }}
              onClick={() => onAddTicker(ticker)}
            >
              <span>{ticker?.symbol}</span>
              <span>{ticker?.securityName}</span>
              <span>{ticker?.exchange}</span>
            </Result>
          ))}
        </Results>
      ) : null}
    </Container>
  );
};

export default SearchSymbols;
