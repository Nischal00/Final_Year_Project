const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  client_id: process.env.CLIENTID,
  client_secret: process.env.CLIENTSECRET,
  port: process.env.PORT,
  mongodburl: process.env.MONGODB_URL,
  jwtsecret: process.env.JWT_SECRET,
  
};
