const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name cannot be shorter than 3 characters'],
    maxlength: [50, 'Name cannot be longer than 50 characters'],
  },

  /*owner: {
     type: Schema.Types.ObjectId, ref: 'User', require: true
  },*/
  /*members: [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],*/

  tasks: {
    type: [
      {
        name: {
          type: String,
          require: [true, 'Please add a name'],
          maxlength: [50, 'Name cannot be longer than 50 characters'],
        },
        desc: {
          type: String,
          maxlength: [100, 'Name cannot be longer than 100 characters'],
        },
        state: {
          type: String,
          required: true,
          enum: ['Pending', 'In Process', 'Completed'],
          default: 'Pending',
        },
        /*takedBy: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          default: ' ',        
        },*/
        createdAt: {
          type: Date,
          default: Date.now,
        },
        default: {},
      },
    ],
    required: true,
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('List', ListSchema);
