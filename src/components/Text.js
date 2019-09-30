import React from "react";
import Typist from "react-typist";
import { Box, Button, Grid, Typography } from "@material-ui/core";

import { useSection } from "./Section";

const Text = ({ children, ...props }) => {
  const { isActive, onFinished } = useSection();
  const endOfTextRef = React.useRef();

  const skip = e => {
    console.log("Text.skip", { isActive, onFinished });
    if (isActive) onFinished();
  };

  console.log("Text.render", { isActive, onFinished });

  return (
    <div>
      {!isActive ? (
        <Box>
          <Typography component="div">{children}</Typography>
        </Box>
      ) : (
        <Typist cursor={{ show: false }} onTypingDone={skip} {...props}>
          <Typography component="div">{children}</Typography>
        </Typist>
      )}
      {isActive && (
        <Grid container justify="center" alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={skip}>
              Skip
            </Button>
          </Grid>
        </Grid>
      )}
      <div
        style={{ paddingTop: "2em", float: "left", clear: "both" }}
        ref={endOfTextRef}
      />
    </div>
  );
};

Text.Delay = Typist.Delay;

export default Text;
