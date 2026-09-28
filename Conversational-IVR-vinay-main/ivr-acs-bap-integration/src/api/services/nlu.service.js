const logger = require("../../utils/logger");

const getIntent = (query) => {
  const lowerCaseQuery = query.toLowerCase();
  logger.info(`Performing intent recognition for query: "${lowerCaseQuery}"`);

  if (lowerCaseQuery.includes("balance")) {
    return "CheckBalance";
  }
  if (
    lowerCaseQuery.includes("agent") ||
    lowerCaseQuery.includes("human") ||
    lowerCaseQuery.includes("representative")
  ) {
    return "TalkToAgent";
  }

  if (
    (lowerCaseQuery.includes("email") ||
      lowerCaseQuery.includes("e-statement")) &&
    lowerCaseQuery.includes("statement")
  ) {
    return "RequestEStatement";
  }

  // This rule will now only be checked if the one above is false.
  if (
    lowerCaseQuery.includes("statement") ||
    lowerCaseQuery.includes("transactions")
  ) {
    return "GetMiniStatement";
  }

  if (
    lowerCaseQuery.includes("lost my card") ||
    lowerCaseQuery.includes("stolen card")
  ) {
    return "ReportLostCard";
  }
  if (lowerCaseQuery.includes("activate") && lowerCaseQuery.includes("card")) {
    return "ActivateNewCard";
  }
  if (
    lowerCaseQuery.includes("pay") ||
    lowerCaseQuery.includes("bill") ||
    lowerCaseQuery.includes("utility") ||
    lowerCaseQuery.includes("recharge")
  ) {
    return "PayUtilityBill";
  }

  if (
    lowerCaseQuery.includes("update") ||
    lowerCaseQuery.includes("contact") ||
    lowerCaseQuery.includes("address") ||
    lowerCaseQuery.includes("number")
  ) {
    return "UpdateContactDetails";
  }
  if (lowerCaseQuery.includes("loan") || lowerCaseQuery.includes("emi")) {
    return "GetLoanDetails";
  }
  if (
    lowerCaseQuery.includes("suspicious") ||
    lowerCaseQuery.includes("fraud") ||
    lowerCaseQuery.includes("unauthorized")
  ) {
    return "ReportSuspiciousTransaction";
  }

  return "Unknown"; // Default fallback intent
};

module.exports = {
  getIntent,
};
