import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useSection } from "./Section";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export default ({ children }) => {
  const { isFinished, onFinished } = useSection();
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Button
          disabled={isFinished}
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={e => onFinished()}
        >
          {children}
        </Button>
      </Grid>
    </Grid>
  );
};
