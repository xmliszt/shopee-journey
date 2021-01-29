import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Screens
import Home from './screens/Home';
import Navigation from './screens/Navigation';
import Login from './screens/Login';
import ApiFetch from './screens/ApiFetch';
import CameraAlbum from './screens/CameraAlbum';
import Location from './screens/Location';
import Shake from './screens/Shake';
import Share from './screens/Share';

import './style.scss';

function Demo() {
  return (
    <>
      <Navbar />
      <div styleName='content'>
        <Switch>
          <Route exact path='/demo/' component={Home} />
          <Route path='/demo/navigation' component={Navigation} />
          <Route path='/demo/login' component={Login} />
          <Route path='/demo/api-fetch' component={ApiFetch} />
          <Route path='/demo/camera-album' component={CameraAlbum} />
          <Route path='/demo/location' component={Location} />
          <Route path='/demo/shake' component={Shake} />
          <Route path='/demo/share' component={Share} />
        </Switch>
      </div>
    </>
  );
}

export default Demo;
