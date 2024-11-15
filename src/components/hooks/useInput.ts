import { useEffect, useState } from "react";

export type InputForm = {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  hasError: boolean;
  errorMessage: string;
  setErrorMessage: (value: React.SetStateAction<string>) => void;
  isValid: () => boolean;
};

export default function useInputForm(
  defaultValue: string,
  validationFn: (value: string) => string,
): InputForm {
  const [value, setValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage(validationFn(value));
  }, [value, validationFn]);

  function isValid() {
    const result = validationFn(value);
    setErrorMessage(result);
    return result === "";
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setValue(value);
    setDidEdit(false);
  }

  function handleBlur() {
    setDidEdit(true);
  }

  return {
    value,
    handleChange,
    handleBlur,
    hasError: didEdit && errorMessage != "",
    errorMessage,
    setErrorMessage,
    isValid: isValid,
  };
}
