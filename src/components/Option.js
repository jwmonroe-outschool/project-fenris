import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useChoice } from "./Choice";

const useStyles = makeStyles({
  wrapper: {
    width: "100%"
  },
  inner: {
    width: "100%"
  }
});

const Option = ({ children, section }) => {
  const classes = useStyles();
  const { selectedElement, onFinished } = useChoice();
  return !selectedElement ? (
    <Grid item className={classes.wrapper}>
      <Button
        className={classes.inner}
        variant="contained"
        color="primary"
        onClick={e => onFinished(section)}
      >
        {children}
      </Button>
    </Grid>
  ) : selectedElement === section ? (
    <Grid item className={classes.wrapper}>
      <Button
        className={classes.inner}
        variant="contained"
        color="primary"
        disabled
      >
        {children}
      </Button>
    </Grid>
  ) : null;
};
export default Option;
