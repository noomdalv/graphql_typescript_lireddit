import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = {
  name: string;
  type: string;
  label: string;
  placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} {...props} id={field.name} />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};
