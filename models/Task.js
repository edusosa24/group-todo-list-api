const mongoose = require('mongoose');
const User = require('./User');
const List = require('./List');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.'],
    minlength: [3, 'Name cannot be shorter than 3 characters'],
    maxlength: [30, 'Title cannot be longer than 30 characters.'],
  },

  description: {
    type: String,
    required: [true, 'Please add a description.'],
    maxlength: [300, 'Description cannot be longer than 300 characters.'],
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
