const isEmpty = require("./is-empty");

module.exports = function validateMemorialInput(data) {
  let errors = {};

  if (isEmpty(data.victim)) {
    errors.victim = "Victim name field is required";
  }

  if (isEmpty(data.eulogy)) {
    errors.eulogy = "Eulogy and memorial field is required.";
  }
  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};