"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_schema_1 = require("../schema/user.schema");
const email_1 = require("../email/email");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        // Check if user already exists
        const existingUser = yield user_schema_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const saltRounds = 10;
        const hashPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        // Create new user
        const newUser = user_schema_1.User.create({ email, password: hashPassword });
        yield user_schema_1.User.save(newUser);
        res.status(201).json({
            success: true,
            message: 'User signed up successfully',
            user: newUser,
        });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.signup = signup;
const generateToken = (userId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenPayload = { userId, userEmail };
    const accessTokenSecret = process.env.JWT_SECRET || '';
    const accessTokenOptions = { expiresIn: '1h' };
    const accessToken = jsonwebtoken_1.default.sign(accessTokenPayload, accessTokenSecret, accessTokenOptions);
    return accessToken;
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_schema_1.User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        return res.status(404).json({
            success: false,
            message: 'Password Incorrect',
        });
    }
    const accessToken = yield generateToken(user.id, user.email);
    return res.status(200).json({
        success: true,
        accessToken,
    });
});
exports.login = login;
const generateOtp = () => __awaiter(void 0, void 0, void 0, function* () {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    const otpString = otp.toString();
    return otpString;
});
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield user_schema_1.User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    const generatedOtp = yield generateOtp();
    const saltRounds = 10;
    const hashOtp = yield bcryptjs_1.default.hash(generatedOtp, saltRounds);
    user.otp = hashOtp;
    yield user.save();
    const emailSender = new email_1.EmailSender();
    const emailOptions = {
        email: email,
        subject: 'Verification OTP',
        message: `Your verification OTP is ${generatedOtp}. Please use this OTP to verify your email`,
    };
    emailSender.sendEmail(emailOptions);
    res.status(200).json({ message: 'check your email for reset password OTP' });
});
exports.forgetPassword = forgetPassword;
//module.exports = {signup};
//export default signup
