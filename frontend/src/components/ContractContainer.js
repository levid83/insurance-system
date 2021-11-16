import { useEffect, useState, createContext } from "react";

import useService from "../hooks/useService";

import ContractService from "../services/ContractService";
import ContractList from "./ContractList";

import AddContractForm from "./AddContractForm";

import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { TableHead } from "@mui/material";
import Pagination from "./Pagination";
import TerminateContractForm from "./TerminateContractForm";

const ROWS_PER_PAGE = 25;

export const ContractContext = createContext({});

export default function ContractContainer() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(0);
  const [contracts, getContracts, error, isLoading] = useService(
    ContractService.getContracts,
    { contracts: [], count: 0 }
  );

  useEffect(() => {
    getContracts({
      page,
      limit: ROWS_PER_PAGE,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRefresh = () => {
    setSelected(0);
    getContracts({
      page,
      limit: ROWS_PER_PAGE,
    });
  };

  const handleSelectedRow = (event, id) => {
    setSelected(id);
  };

  if (error) throw new Error("Cannot get the contract list");

  return (
    <ContractContext.Provider
      value={{
        onPageChange: handlePageChange,
        page: page,
        rowsPerPage: ROWS_PER_PAGE,
        count: contracts.count,
        refresh: handleRefresh,
        selected: selected,
        onSelectRow: handleSelectedRow,
      }}
    >
      <AddContractForm />
      <TerminateContractForm />
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table sx={{ minWidth: 600 }} size={"small"} aria-label="Contract list">
          <TableHead>
            <TableRow key="header">
              <TableCell></TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Premium</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Termination Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <ContractList contracts={contracts.contracts} />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Pagination colSpan={5} />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </ContractContext.Provider>
  );
}
