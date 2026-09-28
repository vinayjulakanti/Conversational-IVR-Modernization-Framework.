const logger = require("../../utils/logger");

const transferToAgent = async (sessionId) => {
  logger.info(`Simulating ACS agent transfer for session: ${sessionId}`);
  return {
    sessionId,
    message: "Please wait while I transfer you to an agent.",
  };
};

const reportLostCard = async (sessionId) => {
  logger.info(`Simulating lost card report for session: ${sessionId}`);
  return {
    sessionId,
    message:
      "Thank you. Your card has been blocked immediately. A customer service agent will call you shortly to confirm.",
  };
};

const activateNewCard = async (sessionId) => {
  logger.info(`Simulating new card activation for session: ${sessionId}`);
  return {
    sessionId,
    message:
      "To activate your new card, please enter the 16-digit card number followed by the hash key.",
  };
};

const updateContactDetails = async (sessionId) => {
  logger.info(`Simulating contact detail update for session: ${sessionId}`);
  return {
    sessionId,
    message:
      "A secure link to update your contact details has been sent to your registered mobile number. Please follow the instructions in the message.",
  };
};

const reportSuspiciousTransaction = async (sessionId) => {
  logger.info(
    `Simulating suspicious transaction report for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Thank you for reporting this. A temporary hold has been placed on your account for security. Our fraud protection team will contact you within the next hour.",
  };
};

const transferToAgentFromSpeech = async (sessionId) => {
  logger.info(
    `ACS: Fulfilling speech request for agent transfer for session: ${sessionId}`
  );
  return {
    sessionId,
    message: "Connecting you to a live agent. Please hold.",
  };
};

const reportLostCardFromSpeech = async (sessionId) => {
  logger.info(
    `ACS: Fulfilling speech request for lost card for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Thank you for reporting this. Your card has been blocked immediately. An agent will call you shortly to confirm.",
  };
};

const activateNewCardFromSpeech = async (sessionId) => {
  logger.info(
    `ACS: Fulfilling speech request to activate card for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "To activate your new card, please say or enter the 16-digit card number.",
  };
};

const updateContactDetailsFromSpeech = async (sessionId) => {
  logger.info(
    `ACS: Fulfilling speech request to update contact details for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "A secure link to update your contact details has been sent to your registered mobile number.",
  };
};

const reportSuspiciousTransactionFromSpeech = async (sessionId) => {
  logger.info(
    `ACS: Fulfilling speech request for suspicious transaction for session: ${sessionId}`
  );
  return {
    sessionId,
    message:
      "Thank you for reporting this. A temporary hold has been placed on your account. Our fraud protection team will contact you within the next hour.",
  };
};

module.exports = {
  transferToAgent,
  reportLostCard,
  activateNewCard,
  updateContactDetails,
  reportSuspiciousTransaction,
  transferToAgentFromSpeech,
  reportLostCardFromSpeech,
  activateNewCardFromSpeech,
  updateContactDetailsFromSpeech,
  reportSuspiciousTransactionFromSpeech,
};
