/* Note Reducers
 *
 */

function noteApp(state = [], action) {
  switch (action.type) {
    case 'ADD_NOTE':
      // Adds a new note
      return Object.assign({}, state, { // We do not mutate state but use a copy instead
        notes: [
          ...state.notes,
          // Newest note appended
          {
            _id: action.id,
            body: action.body,
            dateCreated: action.dateCreated,
          },
        ],
      });

    case 'REMOVE_NOTE':
      // Removes a specific note
      // TODO: Do something with these undefineds

      if (!action.id) {
        return undefined;
      }

      // Filter only the ones we want
      const filtered = state.notes.filter(note => note._id !== action.id);

      return Object.assign({}, state, {
        notes: filtered,
      });

    case 'UPDATE_NOTE':
      // Updates a specific note, that is, its text
      // TODO: Do something with these undefineds

      if (!(action.id && action.body)) {
        return undefined;
      }

      const excluded = state.notes.filter(note => note._id !== action.id);

      return Object.assign({}, state, {
        notes: [
          ...excluded,
          // This is the same note we just received it fresh from the API
          {
            _id: action.id,
            body: action.body,
            dateCreated: action.dateCreated,
          },
        ],
      });

    case 'RECEIVE_NOTES':
      // Received notes from the server, append them
      // to the existing notes.

      if (!action.notes) {
        return state;
      }

      return Object.assign({}, state, {
        fetchedInitial: true,
        notes: [
          ...state.notes,
          ...action.notes,
        ],
      });

    case 'RECEIVE_NOTE':
      // Receive a single note, i.e hitting a specific route without loading entire list
      // TODO: Implement this
      return state;

    default:
      return state;
  }
}

export default noteApp;
