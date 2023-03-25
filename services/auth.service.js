const UserMongo = require("../model/Usuario");
const jwt = require("jsonwebtoken");

const loginService = (email) => UserMongo.findOne({ email }).select("senha");

const udpateToken = (user) => {
    const userID = user.userID;
  return UserMongo.findOneAndUpdate({userID}, user, {
    returnDocument: "after",
  });
};

const generateToken = (user, segredo) => {
    return jwt.sign(user, segredo);
};

const validateToken = (token, segredo) => {
  return jwt.verify(token, segredo);
};

module.exports = { loginService, udpateToken, generateToken, validateToken, };
