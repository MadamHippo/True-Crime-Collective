const isEmpty = require("./is-empty");

module.exports = function validateCasesInput(data) {
  let errors = {};


  if (isEmpty(data.perp)) {
    errors.perp = "Entry is required";
  }

  if (isEmpty(data.victim)) {
    errors.victim = "Victim field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};