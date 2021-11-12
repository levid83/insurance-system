import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";

const ContractForm = () => {
  const validationSchema = Yup.object().shape({
    premium: Yup.number()
      .positive("Premium must be positive")
      .required("Premium is required"),
    startDate: Yup.date()
      .min(new Date().toISOString().substr(0, 10))
      .required("Start date is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      premium: 0.0,
      startDate: new Date().toISOString().substr(0, 10),
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
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
          {...register("premium")}
          sx={{ width: "4em" }}
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
      >
        Add Contract
      </Button>
    </Box>
  );
};

export default ContractForm;
