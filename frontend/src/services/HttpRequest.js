import axios from "axios";
import logger from "../utils/logger";

axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_URL || "http://localhost:3001/";
axios.defaults.timeout = 5000;
axios.defaults.headers["Content-Type"] = "application/json";

const httpErrorHander = (error) => {
  if (error.response) {
    logger.error(error.response.data.error, error.response.status);
    return { error: error.response.data.error, code: error.response.status };
  } else if (error.request) {
    logger.error("request error");
    return { error: "request error", code: 500 };
  } else {
    logger.error(error.message);
    return { error: error.message, code: 500 };
  }
};

const request = async ({ url, method, body }) => {
  try {
    const response = await axios[method](url, { ...body });
    if (response.data.error)
      return Promise.reject(httpErrorHander({ response }));

    return response.data.data;
  } catch (err) {
    return Promise.reject(httpErrorHander(err));
  }
};

export default request;
