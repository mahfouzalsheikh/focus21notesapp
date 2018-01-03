// Note DB Schema, Model and Methods
import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },

});

NoteSchema.statics = {
  // Get a specific note by id
  get(id) {
    return this.findById(id)
      .exec();
  },

  // Returns a filtered list of all notes
  list(limit, skip, order) {
    const orderBy = (order === 'desc') ? -1 : 1;

    return this.find()
      .sort({ dateCreated: orderBy })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  // Creates a new note from the body
  create(body) {
    const newNote = new this({
      body,
    });

    return newNote.save();
  },
};

export default mongoose.model('Note', NoteSchema);
