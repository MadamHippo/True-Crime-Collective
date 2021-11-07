const mongoose = require('mongoose');
const Schema = mongoose.Schema; // within Mongoose, theres a library call Schema.

// like the user.js, you want to connect profile with user.
// It will help id each user, if you put user id is 1 then it will help look up that relationship. Instead of copying. Always aim for short and small relationships so you don't waste performance. Have a simple relationship within mongodb.

// instead of duplicating data, keep a simple relationship instead. In no sql, keep relationships flat.
// every colum we create in users collection, we need to say what types of the schema is it.
const ProfileSchema = new Schema({
  //first column: it's the user column. It will tie into the users collection.
  user: {
    type: Schema.Types.ObjectId,
    // the type of this column is then schema.types.objectId. The object that gets created is unique for each row so the user will refer to objectID in the collection below called 'users' [see ref]
    ref: 'users'
  },
  handle: {
    // handle is like username...ie twitter handle
    type: String,
    required: true,
    max: 20
  },
  age: {
    type: Number,
    required: true
  },
  occupation: {
    type: String
  },
  education: {
    type: String
  },
  location: {
    type: String
  },
  hobbies: {
    type: [String], // you can have more than 1 element in the array
    required: true
  },
  bio: {
    type: String
  },

  // experience is an array of objects, so we can add as many entries.

  fav_crime_cases: [{
    perp: {
      type: [String],
      required: true
    },
    victim: {
        type: [String],
        required: true
    },
    about: {
      type: String
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    active_case: {
      type: Boolean,
      default: false
    },
    theories: {
     type: String
    }
  }],

  // education is an array, so we can add as many entries.

  memorial: [{
    victim: {
      type: String,
      required: true
    },
    in_memory: {
      type: String,
      required: true
    },
    from: {
      type: Date
    },
    to: {
      type: Date
    },
    living: {
      type: Boolean,
      default: false
    }
  }],

  // No social media is required but can be included in the model
   social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }   
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
//asking mongoose to create a model, called profile model in the table. And that's what is being exported from the model.

// Next step is focusing on the API. We are following the MVC pattern. Model is done. 