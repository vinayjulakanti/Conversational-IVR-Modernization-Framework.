require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  bapApiUrl: process.env.BAP_API_URL,
};
