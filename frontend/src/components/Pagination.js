import { useContext } from "react";
import { ContractContext } from "./ContractContainer";

import PropTypes from "prop-types";
import { TablePagination } from "@mui/material";
import PaginationActions from "./PaginationActions";

export default function Pagination({ colSpan }) {
  const contractContext = useContext(ContractContext);
  return (
    <TablePagination
      colSpan={colSpan}
      count={contractContext.count}
      rowsPerPage={contractContext.rowsPerPage}
      rowsPerPageOptions={[contractContext.rowsPerPage]}
      page={contractContext.page}
      onPageChange={contractContext.onPageChange}
      ActionsComponent={PaginationActions}
    />
  );
}

Pagination.propTypes = {
  colSpan: PropTypes.number.isRequired,
};
