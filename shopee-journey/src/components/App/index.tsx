import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from 'screens/HomePage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/' component={HomePage} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default hot(App);
