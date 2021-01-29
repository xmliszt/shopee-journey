import { createStore } from 'redux';

import rootReducer from 'ducks/root';

export const store = createStore(rootReducer);
