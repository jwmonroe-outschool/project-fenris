import { createMuiTheme } from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#005276" },
    secondary: { main: "#BB2400" },
    background: { default: blueGrey[800] }
  },
  typography: {
    fontFamily:
      "Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace"
  }
});

export default theme;
