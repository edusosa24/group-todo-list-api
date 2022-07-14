const mongoose = require('mongoose');
const User = require('./User');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title.'],
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

  takedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: ' ',
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: ' ',
  },
});

module.exports = mongoose.model('Task', TaskSchema);
