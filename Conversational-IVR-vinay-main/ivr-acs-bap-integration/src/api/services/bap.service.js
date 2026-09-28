const axios = require("axios");
const config = require("../../config");
const logger = require("../../utils/logger");

const getBalance = async (sessionId) => {
  try {
    const response = await axios.post(config.bapApiUrl, {
      sessionId,
      intent: "GetBalance",
    });
    // Return the standardized 'message' format
    return {
      sessionId: response.data.sessionId,
      message: response.data.responseText,
    };
  } catch (error) {
    logger.error("Error calling BAP service:", error.message);
    throw new Error("Failed to get response from BAP");
  }
};

const getMiniStatement = async (sessionId) => {
  logger.info(`Fetching mini statement from BAP for session: ${sessionId}`);
  return {
    sessionId,
    message:
      "Your last five transactions are: a debit of $50, a credit of $200, a debit of $25, a debit of $10, and a credit of $500.",
  };
};

const payUtilityBill = async (sessionId) => {
  logger.info(
    `Processing utility bill payment from BAP for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Please say or enter your 10-digit customer ID for your utility provider.",
  };
};

const getLoanDetails = async (sessionId) => {
  logger.info(`Fetching loan details from BAP for session: ${sessionId}`);
  return {
    sessionId,
    message:
      "For your personal loan, your next EMI of $350 is due on the 15th of this month. Your outstanding balance is $8,500.",
  };
};

const requestEStatement = async (sessionId) => {
  logger.info(
    `Processing e-statement request from BAP for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Your e-statement for the last 3 months has been sent to your registered email address. Please check your inbox.",
  };
};

//Conversational Functions

const getBalanceFromSpeech = async (sessionId) => {
  logger.info(
    `BAP: Fulfilling speech request for balance for session: ${sessionId}`
  );
  const dtmfResponse = await getBalance(sessionId);
  return { sessionId, message: dtmfResponse.message };
};

const getMiniStatementFromSpeech = async (sessionId) => {
  logger.info(
    `BAP: Fulfilling speech request for mini statement for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Your last five transactions are: a debit of $50, a credit of $200, a debit of $25, a debit of $10, and a credit of $500.",
  };
};

const payUtilityBillFromSpeech = async (sessionId) => {
  logger.info(
    `BAP: Fulfilling speech request for utility bill for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "To pay your utility bill, please say or enter your 10-digit customer ID.",
  };
};

const getLoanDetailsFromSpeech = async (sessionId) => {
  logger.info(
    `BAP: Fulfilling speech request for loan details for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "For your personal loan, your next EMI of $350 is due on the 15th of this month. Your outstanding balance is $8,500.",
  };
};

const requestEStatementFromSpeech = async (sessionId) => {
  logger.info(
    `BAP: Fulfilling speech request for e-statement for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Your e-statement for the last 3 months has been sent to your registered email address.",
  };
};

module.exports = {
  getBalance,
  getMiniStatement,
  payUtilityBill,
  getLoanDetails,
  requestEStatement,
  getBalanceFromSpeech,
  getMiniStatementFromSpeech,
  payUtilityBillFromSpeech,
  getLoanDetailsFromSpeech,
  requestEStatementFromSpeech,
};
