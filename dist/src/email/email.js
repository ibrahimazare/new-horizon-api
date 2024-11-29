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
exports.EmailSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailSender {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            secure: false, // Set to true if using SSL/TLS
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
    }
    sendEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, subject, message } = options;
            // Define mail options
            const mailOptions = {
                from: process.env.USER,
                to: email,
                subject,
                html: message,
            };
            try {
                yield this.transporter.sendMail(mailOptions);
                console.log('Email sent successfully');
            }
            catch (error) {
                console.error('Error sending email:', error);
            }
        });
    }
}
exports.EmailSender = EmailSender;
exports.default = EmailSender;
