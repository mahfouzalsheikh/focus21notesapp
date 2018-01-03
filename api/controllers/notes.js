// Note business logic

import Note from '../models/note';

// Creates a new Note
const create = (req, res) => {
  Note.create(req.body.text)
  .then(newNote => res.json(newNote))
  .catch((e) => { throw new Error(e); });
};

// Retrieves a specific Note
const read = (req, res) => {
  Note.get(req.params.id)
  .then(note => res.json(note))
  .catch((e) => { throw new Error(e); });
};

// Updates a specific Note
const update = (req, res) => {
  Note.get(req.params.id)
  .then((note) => {
    /* eslint no-param-reassign: ["error", { "props": false }] */
    note.body = req.body.text;
    return note.save();
  })
  .then(note => res.json(note))
  .catch((e) => { throw new Error(e); });
};

// Removes a specific Note
const remove = (req, res) => {
  Note.get(req.params.id)
  .then(note => note.remove())
  .then(note => res.json(note))
  .catch((e) => { throw new Error(e); });
};

// Lists all Notes or optionall filters based on params
const list = (req, res) => {
  const limit = parseInt(req.query.limit || 0, 10);
  const skip = parseInt(req.query.skip || 0, 10);
  const order = req.query.order || 'desc';

  Note.list(limit, skip, order)
  .then(notes => res.json(notes))
  .catch((e) => { throw new Error(e); });
};


export default { read, create, update, remove, list };
