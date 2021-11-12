import { TableCell, TableRow } from "@mui/material";
export default function Contract({ contract }) {
  return (
    <TableRow>
      <TableCell>{contract.id}</TableCell>
      <TableCell>{contract.premium}</TableCell>
      <TableCell>{contract.start_date}</TableCell>
      <TableCell>{contract.termination_date}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
