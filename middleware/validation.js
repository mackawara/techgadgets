const { body, validationResult } = require("express-validator");

const contactFormRules = () => {
  return [
    body("name", "Please a enter a valid name")
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .trim()
      .escape(),

    body("email")
      .not()
      .isEmpty()
      .withMessage("Please enter a valid Email")
      .isEmail()
      .withMessage("Email entered is not a valid email address ")
      .normalizeEmail()
      .trim()
      .escape(),
    body("contact")
      .not()
      .isEmpty()
      .withMessage(`Mobile number is required`)
      //.isLength({ min: 10, max: 13 })
      .isNumeric()
      .withMessage(`Ensure your mobile number has no invalid characters`)
      .isMobilePhone()
      .trim()
      .escape(),
  ];
};

const signUpRules = () => {
  return [
    body("email")
      .not()
      .isEmpty()
      .withMessage("Please enter a valid Email")
      .isEmail()
      .withMessage("Email entered is not a valid email address ")
      .normalizeEmail()
      .trim()
      .escape(),
  ];
};
const validateForm = (req, res, next) => {
  const result = validationResult(req);

  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        message: error.msg,
      };
    },
  });
  const errors = myValidationResult(req);
  if (!result.isEmpty()) {
    const formatted = errors.mapped();

    res.setHeader("Content-Type", "application/json");
    res.status(422).render("home.ejs",{errors:formatted})
    res.status(422).send(formatted);
  } else {
    console.log("Validation passed");

    return next();
  }
};

module.exports = { signUpRules, contactFormRules, validateForm };
