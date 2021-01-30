import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../screens/HomePage';
import BrowsePage from '../../screens/BrowsePage';
import VouchersPage from '../../screens/VouchersPage';
import './style.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f44336',
    },
  },
});

function App() {
  return (
    <div className='app'>
      <MuiThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            path='/browse'
            component={() => <BrowsePage query='canon selphy cp1300' />}
          />
          <Route path='/vouchers' component={VouchersPage} />
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}

export default hot(App);
