const Validator = require("validator");
const isEmpty = require("./is-valid");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password Field must be between 6 to 30 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
