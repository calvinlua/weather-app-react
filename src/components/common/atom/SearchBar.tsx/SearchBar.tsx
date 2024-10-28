import { SearchRounded } from "@mui/icons-material";
import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { FormEvent } from "react";
import { countries } from "../../../../constants/countries";

import classes from "./SearchBar.module.css";

const SearchBar = (props: {
  setSearchCountry: any;
  handleSearch: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      <Stack direction={"row"} gap={3}>
        <form onSubmit={props.handleSearch}>
          <>
            <Autocomplete
              className={classes["input-box"]}
              freeSolo
              options={countries}
              getOptionLabel={(option) => option}
              onChange={(event: any, value: any) => {
                event.preventDefault();
                props.setSearchCountry(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="filled-basic"
                  label="Country"
                  variant="filled"
                />
              )}
            />
          </>
          <>
            <Button
              className={classes["search-button"]}
              sx={{
                color: "primary.main",
                backgroundColor: "primary.light",
                borderRadius: "20px",
              }}
              type="submit"
            >
              <SearchRounded
                sx={{
                  color: "white",
                }}
              />
            </Button>
          </>
        </form>
      </Stack>
    </>
  );
};

export default SearchBar;
