const mongoose = require('mongoose');
const Schema = mongoose.Schema; // within Mongoose, theres a library call Schema.

// Anytime dealing with Data in app, you need to write your model. See subfolder model. Model (data) View (UI) Controller (Logic/Js). 

// We use Model with Mongoose. Schema = definition of data. It defines the data we will collect. 

// Schema is the definition of data - this is telling Mongodb to build a database for me using this schema. We set up Mongoose to talk to Mongodb
//Create a new schema's definition:

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
// calling mongoose to create a model named users (actual name inside mongodb) using the schema above.
module.exports = User;

// naturally, it has to be exported to be used in another file

// you can also write the above lines in all the same line, like this:
// module.exports = User = mongoose.model('users', UserSchema);

// Final reminder: model in coding language means DATA in the programming world.

