const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema is the definition of data.
//Create a new schema:

const UserSchema = new Schema({
  name: {
    type: String,
    required: true

  },

  email: {
    type: String,
    required: true
  },
  
  password: {
    type: String,
    required: true

  },
  
  avatar: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  }
  
});

const User = mongoose.model('users', UserSchema);
module.exports = User;

// you can also write the above lines in all the same line, like this:
// module.exports = User = mongoose.model('users', UserSchema);

// model in coding language means DATA in the programming world.