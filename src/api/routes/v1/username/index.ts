import express from 'express';
import validateUsername from './controller/validateUsername';
import { authMiddleware } from '../../../middleware/authMiddleware';
import generateUsername from './controller/generateUsername';
import getUsername from './controller/getUsername';

const username = express.Router();
username.use(authMiddleware);
username.get('/validateUsername',validateUsername);
username.get('/generateUsername',generateUsername);
username.get('/getUsername',getUsername);


export default username;