import { useContext, useState, useEffect } from "react";
import { ContractContext } from "./ContractContainer";
import useService from "../hooks/useService";
import ContractService from "../services/ContractService";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { format } from "date-fns";

import {
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import Notification from "./Notification";

const TerminateContractForm = () => {
  const ctx = useContext(ContractContext);
  const [contractError, setContractError] = useState("");
  const [success, terminateContract, error, isLoading] = useService(
    ContractService.terminateContract,
    null
  );
  useEffect(() => {
    if (success) {
      const tout = setTimeout(() => ctx.refresh(), 3000);
      return () => {
        clearTimeout(tout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const validationSchema = Yup.object().shape({
    terminationDate: Yup.date()
      .typeError("Termination Date is required")
      .required("Termination Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      terminationDate: "",
    },
  });
  const onSubmit = (form) => {
    if (ctx.selected === "" || ctx.selected === 0) {
      setContractError("Please select a contract");
      return false;
    } else {
      setContractError("");
    }
    terminateContract({
      contractId: ctx.selected,
      terminationDate: format(new Date(form.terminationDate), "yyyy-MM-dd"),
    });
  };

  return (
    <>
      <Box
        p={1}
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        autoComplete="on"
      >
        <FormControl>
          <TextField
            name="termination-date"
            label="Termination Date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("terminationDate")}
            error={errors.terminationDate ? true : false}
            sx={{ width: "11em" }}
          />
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          Terminate Contract
        </Button>
        <FormControl>
          <Typography variant="inherit" color="textSecondary">
            {contractError}
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {errors.contractId?.message}
          </Typography>
          <Typography variant="inherit" color="textSecondary">
            {errors.terminationDate?.message}
          </Typography>
        </FormControl>
        {isLoading && (
          <FormControl>
            <CircularProgress />
          </FormControl>
        )}
      </Box>
      {error && (
        <Notification
          type="error"
          message={error}
          position={{ vertical: "top", horizontal: "right" }}
        />
      )}
      {success && (
        <Notification
          type="success"
          message={success}
          position={{ vertical: "top", horizontal: "right" }}
        />
      )}
    </>
  );
};

export default TerminateContractForm;
