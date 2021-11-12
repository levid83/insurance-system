import request, { httpErrorHander } from "./HttpRequest";

const getContracts = async ({ page, limit }) => {
  try {
    const response = await request.get("/contracts/", {
      params: { page, limit },
    });
    if (response.data.error)
      return Promise.reject(httpErrorHander({ response }));
    return response.data.data;
  } catch (err) {
    return Promise.reject(httpErrorHander(err));
  }
};

const ContractService = { getContracts };

export default ContractService;
