const mongoose = require('mongoose');
const User = require('./User');
const List = require('./List');

const TaskSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, 'Please add a todo.'],
    minlength: [10, 'Todo cannot be shorter than 10 characters.'],
    maxlength: [150, 'Todo cannot be longer than 150 characters.'],
  },

  state: {
    type: String,
    enum: ['Pending', 'In Process', 'Completed'],
    default: 'Pending',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add the creator ID.'],
  },

  fromList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: [true, 'Please add the list ID.'],
  },
});

module.exports = mongoose.model('Task', TaskSchema);
