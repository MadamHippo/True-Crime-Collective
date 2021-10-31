// we're using the validator library that's in the package.json library. 
const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  if (!Validator.isLength(data.name, {min: 2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 characters';
  }
  //validator is a built in library I added to javascript
  //check the name length}

  return {
    errors,
    isValid: isEmpty(errors)
  }
  
}