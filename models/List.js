const mongoose = require('mongoose');
const User = require('./User');

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
  },

  members: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },

  tasks: {
    type: [
      {
        task: {
          type: String,
          required: [true, 'Please add a task.'],
          maxlength: [150, 'Task cannot be longer than 150 characters.'],
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
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model('List', ListSchema);
