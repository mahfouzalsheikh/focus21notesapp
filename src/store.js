/* Store
 *
 */

import { createStore } from 'redux';
import noteReducer from './reducers/notes';

// import { v4 } from 'node-uuid';

const initialState = {
  fetchedInitial: false,
  notes: [],
};

const store = createStore(
  noteReducer,
  initialState, // Generally from server, for now empty
);

export default store;
