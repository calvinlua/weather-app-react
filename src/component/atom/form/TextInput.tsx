import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInput = ({
  label,
  name,
  type = "text",
  rules,
  control,
  errors,
}: any) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          type={type}
          margin="dense"
          variant="standard"
          error={!!errors[name]}
          helperText={errors[name] && `${errors[name].message}`}
        />
      )}
    />
  );
};

export default TextInput;
