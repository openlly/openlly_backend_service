import express, { Request, Response } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import getOneUser from './controller/getOneUser';
import multer from 'multer';
import uploadProfileAvatar from './controller/uploadProfileAvatar';
import { fetchUserInbox } from './controller/fetchUserInbox';
import updateUsername from './controller/updateUsername';

const user = express.Router();
const upload = multer({ limits: { fileSize: 2000000 } });

user.use(authMiddleware);

user.get('/', getOneUser);
user.get('/inbox', fetchUserInbox);
user.post('/uploadProfileImg', upload.single('file'), uploadProfileAvatar);
user.patch('/updateUsername', updateUsername);



export default user;
