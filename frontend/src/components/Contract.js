import { useContext } from "react";
import { Radio, TableCell, TableRow } from "@mui/material";
import { ContractContext } from "./ContractContainer";
import PropTypes from "prop-types";

function Contract({ contract }) {
  const ctx = useContext(ContractContext);
  return (
    <TableRow hover onClick={(event) => ctx.onSelectRow(event, contract.id)}>
      <TableCell selected={ctx.selected === contract.id}>
        <Radio
          value={contract.id}
          name="test"
          color="primary"
          checked={ctx.selected === contract.id}
        />
      </TableCell>
      <TableCell>{contract.id}</TableCell>
      <TableCell>{contract.premium}</TableCell>
      <TableCell>{contract.startDate}</TableCell>
      <TableCell>{contract.terminationDate}</TableCell>
    </TableRow>
  );
}

Contract.propTypes = {
  contract: PropTypes.shape({
    id: PropTypes.number,
    premium: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    terminationDate: PropTypes.string,
  }).isRequired,
};

export default Contract;
