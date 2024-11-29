// import { Express } from "express";

// import { Router } from "express";

// import { signup } from "../controller/auth.controller";

// const router = Router();

import { Router } from 'express';

import { signup, login, forgetPassword, getUser } from '../controller/auth.controller';


// import { signup } from '../controller/auth-controller';

 const router = Router();


router.post('/sign-up', signup);
router.post('/user-login', login);
router.post('/forgot-password', forgetPassword);
router.post('/get-user', getUser)



 export default router

