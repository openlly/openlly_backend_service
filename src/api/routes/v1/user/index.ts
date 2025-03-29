import express from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import getOneUser from './controller/getOneUser';
import multer from 'multer';
import uploadProfileAvatar from './controller/uploadProfileAvatar';
import updateUsername from './controller/updateUsername';
import updateFcmToken from './controller/updateFcmToken';
import deleteUser from './controller/deleteUser';


const user = express.Router();
const upload = multer({ limits: { fileSize: 2000000 } });

user.use(authMiddleware);

user.get('/', getOneUser);
user.post('/uploadProfileImg', upload.single('file'), uploadProfileAvatar);
user.patch('/updateUsername', updateUsername);
user.patch('/updateFcmToken', updateFcmToken);
//delete account
user.delete('/delete', deleteUser);



export default user;
