import { Security } from '@baggers/graphql-types';
import { Autocomplete } from '@baggers/ui-components';
import { AutocompleteProps } from '@baggers/ui-components/src/lib/autocomplete/autocomplete.props';
import { useFetcher } from '@remix-run/react';

export function SecuritySearch(props: AutocompleteProps) {
  const fetcher = useFetcher();

  return (
    <Autocomplete
      name="security"
      label="Security"
      results={
        fetcher.data
          ? fetcher.data.map((ticker: Security) => ({
              id: ticker._id,
              render: () => (
                <span className="flex place-content-between">
                  {ticker._id} <span className="">{ticker.name}</span>
                </span>
              ),
            }))
          : []
      }
      onQueryChange={(query) => {
        fetcher.load(`/search-securities/${query}?index`);
      }}
      placeholder="Start typing to search for a security"
      type="search"
      required
      autoFocus
      {...props}
    />
  );
}
