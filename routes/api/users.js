const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const Keys = require('../../config/keys');
const passport = require('passport');

// query the database with the Users from model and see if there's a user in the database already created. In order to query the database, you need a model which is User = require('../../models/User)

//brought in bcrypt password hash

// we called only express.Router because Express is super big and adding Router gets me exactly what I want.

// @route POST /api/users/register....We wrote GET but GET means client is asking the server to give data. POST means client is SUBMITTING data to the server.

// @desc Register a user
// @access Public
// (on every route, do this commenting practice for colleagues and team memebers)
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email})
//findOne means find at least 1 record to prevent the same users to register twice. This is how you perform a query. The condition to match is email 

//.then and .catch are promise statements. .then does not mean anything was found. It only means the previous command either failed or completed successfuly. In this case, if your query was successful or not.

// Therefore you have to write inside .then() to check if the user has an account yet or not. So return the response with a .json if that email already exists.
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists!'});
        // 400 means bad data request, when you have an error, always add an error status to help client.

        // 200 means OK status, it's the default all good status.
      } else {
        // else = if user was NOT found in the databse, then we need to register this new user.


        // Connecting to Gravatar's API f after installing and adding it to the top. This will contain the URL image of my avatar.
        const avatar = gravatar.url(req.body.email, {
          s: '100',
          r: 'pg',
          d: 'mm'
          //mm means if you don't have a profile image, show a dummy image.
        });

        // these are the Keys below I need to pass (in the html body) to Postman via the form urlencoder.
        // We use postman because we have no UI right now. We're imitating a request.

        // Generally the flow goes...submit button, send data to API, API calls Express's server.js. Then server.js sends us to user.js. It sees user registery code above and it register the user. 

        // When the code finishes successfully and saved the account, the newUser will return the entire user information back (confirmed on Postman)

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
          // now you set the avatar we just connected to above avatar 
          // avatar on the right is the variable name in key:name value. Which means you can also just put avatar and JS will automatically deconstruct the key:value with the exact same name 'avatar'
        });

        // encrpyt password: there's 3 functions nested in each other. There's 4 functions in there.
        bcrypt.genSalt(10, (err, salt) => {
          if (err) throw err;
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
        
        //callbacks are parameters, promise statements are attached as then and catch.

        // actually writing the above info into the actual database.

                // Now after enterinng dummy data on Postman, you should go to Mongodb to see the new collection under 'users' - you can see it registered in mongodb. Also note the hashed password. You have successfully registered a new user and written it to the data base!

        // throw raises an exception in the current code block and causes it to exit, or to flow to next catch statement if raised in a try block. console.log just prints out a red message to the browser developer tools javascript console and does not cause any changes of the execution flow.

          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          })
        })

      }
    })
    .catch(err => console.log(err));
// the .then and .catch has no idea what you're trying to do, all it knows is their own job. They only know if they finished their task or not.

});
// if the users path works we will see Users work print!



// @route GET /api/users/login
// @desc LOGIN a user
// @access Public

router.post('/login', (req, res)=> {
  User.findOne({email: req.body.email})
    .then(user => {
      // another promise statement, this time, just .then
      //Check if user exists via email, check negative cases first:
      if (!user){
        return res.status(400).json({email: 'User not found!'});
        // No .catch because it can be written independent of .then. 
        // .catch does not mean a user is not found. All catch means is this command did not finish successfully for whatever reason.

      }

      // Check the password
      bcrypt.compare(req.body.password, user.password)
        // Promise statement, returns bool
        .then(isMatch => {
          if (!isMatch){
            return res.status(400).json({password: 'Password incorrect'});

            // Success message
          } else {
            // Placeholder code: return res.json({msg: 'Success'});...it means everything went fine.

            // Generate token by bringing in jwt (json web token) by writing a function.
            
            // The more details the stronger the authetication...pick what's unique like name and id.
            const payload = {
              id: user.id, 
              name: user.name,
              avatar: user.avatar
            };

            // jwt requires 2 things, payload and key. Go to config and set up a secret key as a parameter. Do not upload to github.

            // .sign is a function

            jwt.sign(
              payload,
              Keys.secretOrKey,
              {expiresIn: 3600},
              //whenever you generate a token, it should expire after some time. This is 1 hour, in terms of seconds.
              //callback:
              (err, token) => {
                return res.json({token: 'Bearer ' + token})
              });
        }
      })
    })
})



// THIRD API called Current. Purpose is to return the current user. Only private API require you to call the passport.
// @route GET /api/users/current
// @desc   Return current user info
// @access Private

router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json(req.user);
});


module.exports = router;

// all communications to Json should be in form of json

