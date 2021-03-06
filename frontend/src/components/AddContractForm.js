import { useContext, useEffect } from "react";
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

const AddContractForm = () => {
  const ctx = useContext(ContractContext);
  const [success, postContract, error, isLoading] = useService(
    ContractService.postContract,
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
    premium: Yup.number()
      .required("Required field")
      .typeError("Number required")
      .positive("Only positive values"),
    startDate: Yup.date()
      .typeError("Start Date is required")
      .required("Start Date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      premium: "",
      startDate: "",
    },
  });
  const onSubmit = (contract) => {
    postContract({
      contract: {
        ...contract,
        startDate: format(new Date(contract.startDate), "yyyy-MM-dd"),
      },
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
            name="premium"
            label="Premium"
            size="small"
            type="number"
            {...register("premium")}
            sx={{ width: "8em" }}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.premium?.message}
          </Typography>
        </FormControl>
        <FormControl>
          <TextField
            name="start-date"
            label="Start Date"
            type="date"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("startDate")}
            error={errors.startDate ? true : false}
            sx={{ width: "11em" }}
          />

          <Typography variant="inherit" color="textSecondary">
            {errors.startDate?.message}
          </Typography>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          Add Contract
        </Button>
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

export default AddContractForm;
