import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { FormEvent } from "react";
import { countries } from "../../../../constants/countries";
import classes from "./SearchBar.module.css";

const SearchBar = (props: {
  setSearchCountry: any;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <div>
      <form onSubmit={props.handleSearch} style={{ display: "flex " }}>
        <>
          <Autocomplete
            className={classes["input-box"]}
            freeSolo
            options={countries}
            getOptionLabel={(option) => option}
            onChange={(event: any, value: any) => {
              console.log(value);
              event.preventDefault();
              props.setSearchCountry(value);
            }}
            sx={{
              "& .MuiAutocomplete-root": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-inputRoot": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-input": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-popupIndicator": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-clearIndicator": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-endAdornment": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-paper": {
                backgroundColor: "transparent",
              },
              "& .MuiAutocomplete-listbox": {
                backgroundColor: "transparent",
              },
              "& .Mui-focusedVisible	": {
                backgroundColor: "transparent",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Country"
                InputProps={{ ...params.InputProps, disableUnderline: true }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "var(--text-color)", // Use the global variable for the label color
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "var(--text-color)", // Use the global variable for the focused label color
                  },
                  // Change the input text color
                  "& .MuiInputBase-input": {
                    color: "var(--text-color)", // Use your global variable
                  },
                  // Optional: Customize placeholder text color
                  "& .MuiInputBase-input::placeholder": {
                    color: "var(--text-color)", // Use your global variable
                    opacity: 1, // Ensure the placeholder is not faded
                  },
                }}
              />
            )}
          />
        </>
        <>
          <Button className={classes["search-button"]} type="submit">
            <SearchRounded sx={{ color: "white" }} />
          </Button>
        </>
      </form>
    </div>
  );
};

export default SearchBar;
