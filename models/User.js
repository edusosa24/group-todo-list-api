const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a user name'],
    unique: [true, 'User name already in use'],
    minlength: [3, 'User name cannot be shorter than 3 characters'],
    maxlength: [12, 'User name cannot be longer than 12 characters'],
  },

  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password cannot be shorter than 6 characters'],
    maxlength: [12, 'Password cannot be longer than 12 characters'],
    select: false,
  },
});

// Encrypt password
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user enter password to hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
