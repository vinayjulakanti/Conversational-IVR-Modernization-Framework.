const express = require("express");
const router = express.Router();
const ivrController = require("../controllers/ivr.controller");

// Endpoint for DTMF inputs
router.post("/ivr/handle-input", ivrController.handleInput);

// Endpoint for Conversational inputs
router.post("/ivr/conversation", ivrController.handleConversation);

module.exports = router;
