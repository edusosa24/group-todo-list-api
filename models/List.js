const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name cannot be shorter than 3 characters'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },

  members: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },

  tasks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Task',
    default: [],
  },
});

module.exports = mongoose.model('List', ListSchema);
