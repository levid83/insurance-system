import request from "./HttpRequest";

const getContracts = async ({ page, limit }) => {
  return await request({
    url: "/contracts",
    method: "get",
    body: {
      params: { page, limit },
    },
  });
};

const postContract = async ({ contract }) => {
  return await request({
    url: "/contract",
    method: "post",
    body: {
      contract,
    },
  });
};

const terminateContract = async ({ contractId, terminationDate }) => {
  return await request({
    url: "/contract",
    method: "patch",
    body: {
      contractId,
      terminationDate,
    },
  });
};

const ContractService = { getContracts, postContract, terminateContract };

export default ContractService;
