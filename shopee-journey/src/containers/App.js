import "./App.css";
import HomePage from "./HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <HomePage />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
