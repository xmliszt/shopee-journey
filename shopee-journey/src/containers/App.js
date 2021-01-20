import "./App.css";
import HomePage from "./HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import loadDummyData from "../dummyLoader";
import { useEffect } from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

function App() {
  useEffect(() => {
    loadDummyData();
    console.log("Dummy data loaded!");
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
