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
  contracts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      premium: PropTypes.number.isRequired,
      startDate: PropTypes.string.isRequired,
      terminationDate: PropTypes.string,
    }).isRequired
  ),
};

export default memo(ContractList, isEqual);
