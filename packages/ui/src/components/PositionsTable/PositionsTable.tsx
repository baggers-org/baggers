import BaggersTable from '@/components/BaggersTable/BaggersTable';
import {
  useGetPositionsLazyQuery,
  PositionsSort,
  PositionsFilter,
} from '@/graphql/Queries.document.gql';
import { useEffect, useState, useCallback } from 'react';

import { DEFAULT_POSITION_PROPERTIES } from './defaultPositionProperties';

type Props = {
  filter?: PositionsFilter;
  fetchWithoutFilter?: boolean;
  defaultSortDirection?: 'asc' | 'desc';
  defaultSortKey?: string;
};
const PositionsTable: React.FC<Props> = ({
  defaultSortDirection,
  defaultSortKey,
  filter,
  fetchWithoutFilter,
}) => {
  const [fetchPositions, { data, loading }] = useGetPositionsLazyQuery();
  const getPositionSort = (key?: string, direction?: 'asc' | 'desc') => {
    if (!key || !direction) return undefined;
    return `${key}_${direction.toUpperCase()}`;
  };
  const [sort, setSort] = useState<string | undefined>(
    getPositionSort(defaultSortKey, defaultSortDirection),
  );

  const handleSort = (sortKey: string, sortDirection: 'asc' | 'desc') => {
    setSort(getPositionSort(sortKey, sortDirection));
  };

  const fetch = useCallback(() => {
    fetchPositions({
      variables: {
        filter,
        sort: sort as PositionsSort,
      },
    });
  }, [filter, sort, fetchPositions]);

  useEffect(() => {
    if (!filter && fetchWithoutFilter) {
      fetch();
      return;
    }
    if (filter) {
      fetch();
    }
  }, [filter, fetchWithoutFilter, fetch]);

  const positions = data?.getPositions?.items || [];

  // TODO: add skeleton
  return (
    <BaggersTable
      tableTitle="POSITIONS"
      objects={positions}
      properties={DEFAULT_POSITION_PROPERTIES}
      onRowClick={console.log}
      onSort={handleSort}
      onSelectAllClick={console.log}
      onToolbarAction={console.log}
      page={1}
      showPagination
      onChangePage={console.log}
      sortKey={defaultSortKey}
      sortDirection={defaultSortDirection}
    />
  );
};
export default PositionsTable;
