const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const CustomError = require("../utils/customError");

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) throw new CustomError("Not authorized, token missing", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // console.log(decoded);

    if (!decoded?.val) {
      throw new CustomError("Invalid token payload", 401);
    }

    const user = await User.findById(decoded.val).select("-password");
    if (!user) {
      throw new CustomError("User not found", 404,"NotFoundError");
    }
    req.user = user;
    next();
  } catch (err) {
    next(new CustomError("Unauthorized or invalid token", 401));
  }
};

module.exports = { protect };
