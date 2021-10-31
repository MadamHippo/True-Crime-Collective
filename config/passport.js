// for better organization purposes, let's not crowd server.js
// being orangized and clean is import to code for others to read

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');
const User = require('../models/User');

// api created token, sent to a private request containing the token, then Jwt will find the token, decrypt it and extract from it. This request above can 1. decrypt and 2. extract the token.


// you can find the token in the authorization header. 

// NPM doc guide: https://www.npmjs.com/package/passport-jwt

const opts =  {};
opts.jwtFormRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secertOrKey;


// exporting the passport!

// you're setting up passport with the following function (passport.use...) 

// you're saying, hey passport, use jwtstrategy that knows how to use the json token, use the opts as parameter that will locate the token and let you locate the token. Opts will then extract and find where the secretOrKey.

// call back will recieve payload. Done is...?

// if it's valid, payload *which is id, name, and avatar of user* can look at the information.

// -> Login -> Api -> Token -> Passport -> Payload -> User -> ? (Who is the real user)

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (payload, done) => {
    User.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
        // this indicates it's not a valid token.
      })
      .catch(err => console.log(err));

  }))
}