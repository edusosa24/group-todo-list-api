const mongoose = require('mongoose');
const User = require('./User');
const Task = require('./Task');

const ListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.'],
    minlength: [3, 'Name cannot be shorter than 3 characters.'],
    maxlength: [30, 'Name cannot be longer than 50 characters.'],
  },

  description: {
    type: String,
    required: [true, 'Please add a description.'],
    minlength: [10, 'Name cannot be shorter than 10 characters'],
    maxlength: [300, 'Description cannot be longer than 300 characters.'],
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
