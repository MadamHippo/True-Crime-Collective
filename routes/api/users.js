const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const Keys = require('../../config/keys');

// query the database with the Users from model and see if there's a user in the database already created. In order to query the database, you need a model which is User = require('../../models/User)
//brought in bcrypt password hash

// we called only express.Router because Express is super big and adding Router gets me exactly what I want.

// @route GET /api/users/register
// @desc Register a user
// @access Public
// (on every route, do this commenting practice for colleagues and team memebers)
router.post('/register', (req, res) => {
  User.findOne({email: req.body.email})
//findOne means find at least 1 record to prevent the same users to register twice. This is how you perform a query.
    .then(user => {
      if (user){
        return res.status(400).json({email: 'Email already exists!'});
        // 400 means bad data, when you have an error, always add an error status to help client.
      } else {

        // Connecting to Gravatar's API
        const avatar = gravatar.url(req.body.email, {
          s: '100',
          r: 'pg',
          d: 'mm'
          //mm means if you don't have a profile image, show a dummy image.
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
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
      //Check if user exists via email, check negative cases first
      if (!user){
        return res.status(400).json({email: 'User not found!'});

      }

      // Check the password
      bcrypt.compare(req.body.password, user.password)
        // Promise statement, returns bool
        .then(isMatch => {
          if (!isMatch){
            return res.status(400).json({password: 'Password incorrect'});

            // Success message
          } else {
            // Dummy code: return res.json({msg: 'Success'});
            // Generate token, authentication, the more details the stronger the authetication
            const payload = {
              id: user.id, 
              name: user.name,
              avatar: user.avatar
            };

            jwt.sign(
              payload,
              Keys.secretOrKey,
              {expiresIn: 3600},
              //callback:
              (err, token) => {
                return res.json({token: 'Bearer ' + token})
              });
        }
      })
    })
})

module.exports = router;

// all communications to Json should be in form of json