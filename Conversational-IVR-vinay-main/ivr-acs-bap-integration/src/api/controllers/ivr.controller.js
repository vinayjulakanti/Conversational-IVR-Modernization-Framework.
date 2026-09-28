const acsService = require("../services/acs.service");
const bapService = require("../services/bap.service");
const nluService = require("../services/nlu.service");
const logger = require("../../utils/logger");

exports.handleInput = async (req, res, next) => {
  const { sessionId, inputValue } = req.body;
  logger.info(`Processing DTMF input for session ${sessionId}: ${inputValue}`);

  try {
    let response;
    switch (inputValue) {
      case "1":
        response = await bapService.getBalance(sessionId);
        break;
      case "2":
        response = await acsService.transferToAgent(sessionId);
        break;
      case "3":
        response = await bapService.getMiniStatement(sessionId);
        break;
      case "4":
        response = await acsService.reportLostCard(sessionId);
        break;
      case "5":
        response = await acsService.activateNewCard(sessionId);
        break;
      case "6":
        response = await bapService.payUtilityBill(sessionId);
        break;
      case "7":
        response = await acsService.updateContactDetails(sessionId);
        break;
      case "8":
        response = await bapService.getLoanDetails(sessionId);
        break;
      case "9":
        response = await acsService.reportSuspiciousTransaction(sessionId);
        break;
      case "0":
        response = await bapService.requestEStatement(sessionId);
        break;
      default:
        response = { sessionId, message: "Invalid option. Please try again." };
    }
    res.status(200).json(response);
  } catch (error) {
    next(error); // Pass error to the centralized handler
  }
};

exports.handleConversation = async (req, res, next) => {
  const { sessionId, query } = req.body;
  const intent = nluService.getIntent(query);
  logger.info(`Recognized intent: ${intent} for session: ${sessionId}`);

  try {
    let response;
    switch (intent) {
      case "CheckBalance":
        response = await bapService.getBalanceFromSpeech(sessionId);
        break;
      case "TalkToAgent":
        response = await acsService.transferToAgentFromSpeech(sessionId);
        break;
      case "GetMiniStatement":
        response = await bapService.getMiniStatementFromSpeech(sessionId);
        break;
      case "ReportLostCard":
        response = await acsService.reportLostCardFromSpeech(sessionId);
        break;
      case "ActivateNewCard":
        response = await acsService.activateNewCardFromSpeech(sessionId);
        break;
      case "PayUtilityBill":
        response = await bapService.payUtilityBillFromSpeech(sessionId);
        break;
      case "UpdateContactDetails":
        response = await acsService.updateContactDetailsFromSpeech(sessionId);
        break;
      case "GetLoanDetails":
        response = await bapService.getLoanDetailsFromSpeech(sessionId);
        break;
      case "ReportSuspiciousTransaction":
        response = await acsService.reportSuspiciousTransactionFromSpeech(
          sessionId
        );
        break;
      case "RequestEStatement":
        response = await bapService.requestEStatementFromSpeech(sessionId);
        break;
      default:
        response = {
          sessionId,
          message: "Sorry, I didn't understand that. Can you please rephrase?",
        };
    }
    res.status(200).json(response);
  } catch (error) {
    next(error); // Pass error to the centralized handler
  }
};

module.exports = {
  handleInput: exports.handleInput,
  handleConversation: exports.handleConversation,
};
