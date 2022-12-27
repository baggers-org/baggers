import React from 'react';
import { TextFieldProps } from '../text-field/text-field.types';

export type AutocompleteResult = {
  id: string;
  render: () => React.ReactElement;
};
export type AutocompleteProps = TextFieldProps & {
  results?: AutocompleteResult[];
  onQueryChange?: (query: string) => void;
};
