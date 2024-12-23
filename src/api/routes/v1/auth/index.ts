import express, { Request, Response } from 'express';   
import loginController from './controller/loginController';
import signupController from './controller/signupController';


const auth = express.Router();  


auth.post("/login", loginController);
auth.post("/signup", signupController);


export default auth;

