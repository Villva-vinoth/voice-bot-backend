const jwt = require('jsonwebtoken');

const generateToken = (val) => {
  return jwt.sign({ val }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = generateToken;