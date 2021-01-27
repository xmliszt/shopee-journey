import "./App.css";
import HomePage from "./HomePage";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import loadDummyData from "../dummyLoader";
import React, { Component,useEffect } from 'react';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: "#f44336",
//     },
//   },
// });

// function App() {
//   useEffect(() => {
//     loadDummyData();
//     console.log("Dummy data loaded!");
//   }, []);

//   return (
//     <MuiThemeProvider theme={theme}>
//       <div className="App">
//         <HomePage />
//       </div>
//     </MuiThemeProvider>
//   );
// }

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f44336",
    },
  },
});

class App extends Component {
  constructor(){
    super();
    loadDummyData();
    
  }

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


