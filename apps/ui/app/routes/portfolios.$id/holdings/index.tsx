import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@baggers/ui-components';

export default function Holdings() {
  return (
    <div>
      <Table>
        <TableHead>
          <TableHeader>Symbol</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Symbol</TableHeader>
          <TableHeader>Symbol</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Price</TableHeader>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
            <TableCell>123</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
