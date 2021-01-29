import { withLog } from './utils';

import { openAlbum } from './album';
import { openCamera } from './camera';
import { getCurrentLocation } from './location';
import { loginIfNeeded, isUserLoggedIn, getHackathonUserToken } from './login';
import { openApp } from './app';
import { pop } from './pop';
import { push } from './push';
import { share } from './share';
import { startShake, stopShake } from './shake';

const bridge = {
  openAlbum,
  openCamera,
  getCurrentLocation,
  loginIfNeeded,
  isUserLoggedIn,
  getHackathonUserToken,
  openApp,
  pop,
  push,
  share,
  startShake,
  stopShake,
};

export default withLog(bridge);
