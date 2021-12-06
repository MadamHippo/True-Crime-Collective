const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
    errors.text = "Post must be between 5 and 500 characters";
  }

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};