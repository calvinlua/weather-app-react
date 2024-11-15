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
              event.preventDefault();
              props.setSearchCountry(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                focused
                InputProps={{ disableUnderline: true }}
                id="filled-basic"
                label="Country"
                className={classes["search-field"]}
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
