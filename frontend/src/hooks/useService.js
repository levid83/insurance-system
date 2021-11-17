import { useState, useCallback } from "react";

const UseService = (serviceFunction, initialState) => {
  const [error, setError] = useState("");
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const callService = useCallback(
    (props = {}) => {
      setIsLoading(true);
      setError("");
      return serviceFunction(props)
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.error);
          setIsLoading(false);
        });
    },
    [serviceFunction]
  );

  return [data, callService, error, isLoading];
};

export default UseService;
