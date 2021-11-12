import { memo } from "react";
import isEqual from "react-fast-compare";
import PropTypes from "prop-types";
import Contract from "./Contract";

function ContractList({ contracts }) {
  return (
    <>
      {contracts.map((contract) => (
        <Contract key={contract.id} contract={contract} />
      ))}
    </>
  );
}

ContractList.propTypes = {
  contracts: PropTypes.array.isRequired,
};

export default memo(ContractList, isEqual);
