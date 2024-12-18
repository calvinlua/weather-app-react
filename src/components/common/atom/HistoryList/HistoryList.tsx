import { SearchRounded, Delete } from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  ListItem,
  IconButton,
  ListItemText,
} from "@mui/material";
import { WeatherHistory } from "../../../../model/weather/weather.history";
import classes from "./HistoryList.module.css";
import { ReactElement } from "react";

const HistoryList = (props: {
  HistoryList: WeatherHistory[];
  handleRestore: (history_id: number) => void;
  handleDelete: (history_id: number) => void;
}): ReactElement => {
  return (
    <Box className={classes["sub-content-box"]}>
      <Stack>
        <Typography
          variant="subtitle1"
          className={classes["sub-content-title"]}
        >
          Search History
        </Typography>
        <Stack direction={"column"} gap={"18px"}>
          {props.HistoryList.map((history: any): ReactElement => {
            return (
              <ListItem
                className={classes["list-item-box"]}
                key={history.id}
                secondaryAction={
                  <div style={{ display: "flex", columnGap: "1em" }}>
                    <p className={classes["list-item-timestamp"]}>
                      {history.date_history}
                    </p>

                    <IconButton
                      edge="end"
                      aria-label="restore"
                      onClick={():void => props.handleRestore(history.id)}
                      className={classes["list-item-icon-button"]}
                    >
                      <SearchRounded className={classes["list-item-icon"]} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={():void => props.handleDelete(history.id)}
                      className={classes["list-item-icon-button"]}
                    >
                      <Delete className={classes["list-item-icon"]} />
                    </IconButton>
                  </div>
                }
              >
                <ListItemText primary={history.country_name} />
              </ListItem>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default HistoryList;
