const Validator = require("validator");
const isEmpty = require("./is-valid");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post Field must be between 10 to 300 characters";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "Text Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
