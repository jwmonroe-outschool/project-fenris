import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "@material-ui/styles";
import Story from "./story";
import theme from "./theme";

export default () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="sm">
      <Grid container justify="center" alignItems="center">
        <Story />
      </Grid>
    </Container>
  </ThemeProvider>
);
