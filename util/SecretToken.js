require("dotenv").config();
const jwt = require("jsonwebtoken");

//  if (!secretKey) {
//     throw new Error("TOKEN_KEY is missing. Please set it in the .env file.");
//   }

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};