/* Note Actions
 *
 */

// Action types
export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const RECEIVE_NOTE = 'RECEIVE_NOTE';

// Action creators
export function addNote(id, body, dateCreated) {
  return {
    type: ADD_NOTE,
    id,
    body,
    dateCreated,
  };
}

export function removeNote(id) {
  return {
    type: REMOVE_NOTE,
    id,
  };
}

export function updateNote(id, body) {
  return {
    type: UPDATE_NOTE,
    id,
    body,
  };
}

export function receiveNotes(notes) {
  return {
    type: RECEIVE_NOTES,
    notes,
  };
}

export function receiveNote(id) {
  return {
    type: RECEIVE_NOTE,
    id,
  };
}
