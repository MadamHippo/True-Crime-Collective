// Bringing in express, router, passport just like in users.js
// Do not need mongoose so I deleted it
const express = require('express');
const router = express.Router();
const passport = require("passport");

// we need both profile and user models since they're interdependent
//the user will first come to your page...then register their account. Now they're in the database, then they will login. Now they have logged in (getting a token), now send the user to the "dashboard page" which is nothing but the user's profile page. (Path for that is API/profile in postman)

// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");
// Load Validation
const validateProfileInput = require("../../validation/profile");
const validateCasesInput = require("../../validation/cases");
const validateMemorialInput = require("../../validation/memorial");



// The client has a token and now they will send a GET API to get their profile. We need a GET API (below) which will query the profiles collection and ask if this user has this particiular profile yet. It will ask hey does this uer have a profile yet?!

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
// private because no one should be able to view or edit your profile

// you're already in private so put in password auth. You're already in the profile model so just / works.

// First .get API: 
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  // calling passport because it's private API 
  (req, res) => {
    const errors = {};

    // like User.findOne, we're asking profile to find ONE collection based on the User column
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      // Using the populate function call, go find the user's name and avatar so it looks extra nice. Notice name, avatar is inside an array. Whatever you want to bring in, add as many entries as you'd like. It's like a "join" function.

      .then((profile) => {
        //(if no profile...then we will write error message on screen)
        //done on the react side, we will redirect user to create a profile
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
        //if there is a profile, this ^ will give them their profile
      })
      .catch((err) => res.status(404).json(err));
  }
);

// Writing a totally public profile of all the users records. This is unlike modern day Facebook or Linkedin. This is totally open to public.

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch((err) => res.status(404).json(err));
});

// user_id is parameter that's part of the route. The parameters is prefaced with a : and you can call user_id anything, it's used internally it's up to you.

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});


// ANON users can see all users

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

// handle as a parameter name, actually it can be anything but keep it meaningful :)

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  //

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch((err) => res.status(404).json(err));
});


// To create or edit a profile: 
// Private because we can't let anyone edit someone else's profile.

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

// using the same route, but this one is POST not get like the one above.
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }


    // Due to volume of things, we are creating an object called profileFields. It should match profile schema.
    // Built by requesting user id to confirm id
    // Get fields

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.occupation) profileFields.occupation = req.body.occupation;
    if (req.body.education) profileFields.education = req.body.education;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;

    // Hobbies - Spilt the array of hobbies using a delimiter. If the hobby isn't undefined, then we will split an array. Then it will be submitted to the database.
    if (typeof req.body.hobbies !== "undefined") {
      profileFields.hobbies = req.body.hobbies.split(",");
    }

    // Social media
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    
    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update...you need to find your data in the document and then update it with new information.
        // Maybe you're adding new data, not just updating existing ones.
        Profile.findOneAndUpdate(
          { user: req.user.id }, // youre back in the profile by using the unique user ID
          { $set: profileFields }, // you're using $Set (what is $Set?)
          { new: true } // database is in Json so we're updating the existing and maybe even adding new data. New: true is to cover in case you're adding NEW data, not just updating existing ones. 
          // That document you updated is still one document.
        ).then((profile) => res.json(profile));

      // assuming user has no profile yet...go to else

      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then((profile) => {
          if (profile) {
            errors.handle = "That account handle already exists";
            return res.status(400).json(errors);
          }
          // Save Profile - created a new schema of profile if theres no profile existing and saving completed profile to the database.
          // No catch, everything works out
          new Profile(profileFields)
            .save() // save the new data and save it to database to show it on the screen in the next line
            .then((profile) => res.json(profile));
        });
      }
    });
  }
);

// Validation for Cases

// @route   POST api/profile/cases
// @desc    Add cases to profile
// @access  Private
router.post(
  "/cases",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCasesInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      const newCases = {
        perp: req.body.perp,
        victim: req.body.victim,
        about: req.body.about,
        from: req.body.from,
        to: req.body.to,
        active_case: req.body.active_case,
        theories: req.body.theories,
      };

      // Add to Cases array
      profile.cases.unshift(newCases);

      profile.save().then((profile) => res.json(profile));
    });
  }
);

// @route   POST api/profile/memorial
// @desc    Add memorial to profile
// @access  Private

// Same as Cases api

router.post(
  "/memorial",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMemorialInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
      const newMemorial = {
        victim: req.body.victim,
        eulogy: req.body.eulogy,
        from: req.body.from,
        to: req.body.to,
        living: req.body.living,
      };

      // Add to exp array
      profile.memorial.unshift(newMemorial);

      profile.save().then((profile) => res.json(profile));
    });
  }
);




// @route   DELETE api/profile/cases/:cases_id
// @desc    Delete cases from profile
// @access  Private
router.delete(
  "/cases/:cases_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.cases
          .map((item) => item.id)
          .indexOf(req.params.cases_id);

        if (removeIndex === -1) {
          errors.casesnotfound = "Cases not found";
          // Return any errors with 404 status
          return res.status(404).json(errors);
        }
        // Splice out of array
        profile.cases.splice(removeIndex, 1);

        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);


// To delete a profile: 
// Private because we can't let anyone delete someone else's profile.

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/memorial/:memorial_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        // Get remove index
        const removeIndex = profile.memorial
          .map((item) => item.id)
          .indexOf(req.params.memorial_id);

        if (removeIndex === -1) {
          errors.memorialnotfound = "Memorial not found";
          // Return any errors with 404 status
          return res.status(404).json(errors);
        }

        // Splice out of array
        profile.memorial.splice(removeIndex, 1);

        // Save
        profile.save().then((profile) => res.json(profile));
      })
      .catch((err) => res.status(404).json(err));
  }
);

// User quits the website and wants their entire account removed and deleted.
// Remove the entire row of data. Don't waste memory on the user, delete it from the system totally is the User.findOneAndRemove.

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;