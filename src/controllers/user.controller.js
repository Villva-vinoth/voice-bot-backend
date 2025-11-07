const generateToken = require("../utils/generateToken");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const { registerSchema, loginSchema } = require("../helper/user.validation");
const CustomError = require("../utils/customError");
module.exports = {
    register: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;

            const { error } = registerSchema.validate({ username, email, password });
            if (error) {
                throw new CustomError(error.details[0].message);
            }

            const userExists = await User.findOne({
                $or: [{ email }, { username }]
            });

            if (userExists) {
                throw new CustomError('User already exists with this email or username',409);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
            });

            if (!user) {
                throw new CustomError('Invalid user data');
            }

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });

        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const { error } = loginSchema.validate({ email, password });
            if (error) {
                throw new CustomError(error.details[0].message);
            }

            const user = await User.findOne({ email });

            if (!user) {
                throw new CustomError('Invalid email or password',401);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new CustomError('Invalid email or password',401);
            }

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });

        } catch (error) {
            next(error);
        }

    }
}