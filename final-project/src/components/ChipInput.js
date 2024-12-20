import React, { useState } from "react";
import { Autocomplete, Chip, TextField, FormLabel } from "@mui/material";

const ChipInput = ({ label, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <FormLabel htmlFor="keyword-field">Keywords</FormLabel>
      <Autocomplete
        multiple
        freeSolo
        id="keyword-field"
        options={[]}
        value={value}
        onChange={(event, newValue) => {
          onChange(
            newValue.filter(
              (option, index, self) =>
                option.trim() !== "" && self.indexOf(option) === index
            )
          );
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && inputValue.trim() !== "") {
            let newKeywords = value.concat(inputValue.trim());
            onChange(
              newKeywords.filter(
                (option, index, self) =>
                  option.trim() !== "" && self.indexOf(option) === index
              )
            );
            setInputValue("");
            event.preventDefault();
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            // variant="outlined"
            variant="standard"
            label={label}
            placeholder={placeholder}
            fullWidth
          />
        )}
        sx={{ width: "100%" }}
      />
    </>
  );
};

export default ChipInput;
