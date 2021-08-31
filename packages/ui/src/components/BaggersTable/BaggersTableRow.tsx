import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { PropsWithChildren } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  isRenderCell,
  TableConfig,
  TableProperties,
} from './BaggersTableTypes';

type Props<ObjectType> = {
  object: ObjectType;
  properties: TableProperties<ObjectType>;
  isRowSelected: boolean;
} & TableConfig<ObjectType>;
function BaggersTableRow<ObjectType extends { _id: string }>({
  object,
  properties,
  onRowClick,
  allowRowSelection,
  isRowSelected,
}: PropsWithChildren<Props<ObjectType>>) {
  if (!object) return null;
  return (
    <TableRow
      hover
      onClick={(event) => (onRowClick ? onRowClick(object, event) : null)}
      key={object._id}
    >
      {allowRowSelection ? (
        <TableCell padding={allowRowSelection ? `checkbox` : undefined}>
          <Checkbox checked={isRowSelected} />
        </TableCell>
      ) : null}
      {properties.map((property) => {
        if (!property) return null;
        let cellValue = isRenderCell(property)
          ? property?.renderCell(object)
          : object[property?.key];

        if (cellValue === undefined) {
          cellValue = <Skeleton />;
        }
        return <TableCell align={property.align}>{cellValue}</TableCell>;
      })}
    </TableRow>
  );
}

export default BaggersTableRow;
