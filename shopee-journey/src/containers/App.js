import "./App.css";
import HomePage from "./HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <HomePage />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
