import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from "../database/config.database";
import { Response, Request } from "express";
import { User } from "../schema/user.schema";
import {EmailSender, EmailOptions} from '../email/email';

 export const signup = async (req: Request, res: Response) :Promise<any> => {
  const { email, password,surname, firstname,employername  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }


  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password,saltRounds);
    // Create new user
    const newUser = await User.create({ email, password: hashPassword , surname, firstname, employername}).save();
    //await User.save(newUser);

    res.status(201).json({
      success: true,
      message: 'User signed up successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const generateToken = async (userId: string, userEmail: string) => {
  const accessTokenPayload = { userId, userEmail };
  const accessTokenSecret = process.env.JWT_SECRET || '';

  const accessTokenOptions = { expiresIn: '1h' };

  const accessToken = jwt.sign(
    accessTokenPayload,
    accessTokenSecret,
    accessTokenOptions
  );

  return accessToken;
};

export const login = async (req: Request, res: Response):Promise<any> => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user!.password);

  if (!isPasswordMatch) {
    return res.status(404).json({
      success: false,
      message: 'Password Incorrect',
    });
  }

  const accessToken = await generateToken(user!.id, user!.email);

  return res.status(200).json({
    success: true,
    accessToken,
  });
};

const generateOtp = async () => {
  const otp = Math.floor(Math.random() * 900000) + 100000;

  const otpString = otp.toString();
  return otpString;
};


export const forgetPassword = async (req: Request, res: Response) :Promise<any>=> {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const generatedOtp = await generateOtp();
  const saltRounds = 10;
  const hashOtp = await bcrypt.hash(generatedOtp, saltRounds);

  user.otp = hashOtp;
  await user.save();

  const emailSender = new EmailSender();

  const emailOptions: EmailOptions = {
    email: email,
    subject: 'Verification OTP',
    message: `Your verification OTP is ${generatedOtp}. Please use this OTP to verify your email`,
  };

  emailSender.sendEmail(emailOptions);

  res.status(200).json({ message: 'check your email for reset password OTP' });
}


export const getUser = async(req: Request, res:Response): Promise<any> => {
  const { email} = req.body

  const user = await User.findOne({ where: { email}})

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const firstname = user?.firstname
  const employername = user?.employername

  return res.status(200).json({
    success: true,
      firstname, 
      employername
    // message: `Mr ${firstname}  is working with ${employername}`
  })
}



 //module.exports = {signup};
//export default signup