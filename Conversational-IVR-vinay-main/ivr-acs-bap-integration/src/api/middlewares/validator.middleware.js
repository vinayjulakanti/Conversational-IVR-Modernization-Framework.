const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const dtmfValidationRules = () => [
  body("sessionId").notEmpty().withMessage("sessionId is required"),
  body("inputType").equals("DTMF").withMessage("inputType must be DTMF"),
  body("inputValue")
    .notEmpty()
    .withMessage("inputValue is required")
    .isNumeric()
    .withMessage("inputValue must be a numeric string"),
];

const conversationValidationRules = () => [
  body("sessionId").notEmpty().withMessage("sessionId is required"),
  body("query")
    .notEmpty()
    .withMessage("query is required")
    .isString()
    .withMessage("query must be a string"),
];

module.exports = {
  dtmfValidationRules,
  conversationValidationRules,
  handleValidationErrors,
};
