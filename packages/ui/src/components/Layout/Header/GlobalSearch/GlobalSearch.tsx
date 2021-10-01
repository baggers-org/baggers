import { InputBase, styled } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import * as React from 'react';

export type GlobalSearchProps = {};

const Wrapper = styled(`div`)(({ theme }) => ({
  background: theme.palette.primary.main,
  display: `flex`,
}));
const SearchIconWrapper = styled(`div`)(({ theme }) => ({
  padding: theme.spacing(2),
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
}));
const SearchInput = styled(InputBase)(({ theme }) => ({
  color: `white`,
  width: `300px`,
}));
const GlobalSearch: React.FC<GlobalSearchProps> = () => {
  return (
    <Wrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput placeholder="Start typing to search..." />
    </Wrapper>
  );
};
export default GlobalSearch;
