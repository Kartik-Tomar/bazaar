const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProductInput(data) {
  let errors = {};

  data.body.title = !isEmpty(data.body.title) ? data.body.title : "";
  data.body.price = !isEmpty(data.body.price) ? data.body.price : "";
  data.body.description = !isEmpty(data.body.description)
    ? data.body.description
    : "";
  data.files[0] = !isEmpty(data.files[0]) ? data.files[0] : "";

  if (!Validator.isLength(data.body.title, { min: 2, max: 20 })) {
    errors.title = "Title must be between 2 to 20 characters";
  }

  if (Validator.isEmpty(data.body.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.body.price)) {
    errors.price = "Price field is required";
  }

  if (isEmpty(data.files[0])) {
    errors.image1 = "Primary Image is required";
  }

  if (!Validator.isLength(data.body.description, { min: 5, max: 500 })) {
    errors.description = "description must be between 5 to 500 characters";
  }

  if (Validator.isEmpty(data.body.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
