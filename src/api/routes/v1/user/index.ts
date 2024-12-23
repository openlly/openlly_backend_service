import express, { Request, Response } from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import getOneUser from './controller/getOneUser';
import multer from 'multer';
import uploadProfileAvatar from './controller/uploadProfileAvatar';
import { fetchUserInbox } from './controller/fetchUserInbox';

const user = express.Router();  
const upload = multer({ limits: { fileSize: 2000000 } });

user.get('/', 
    authMiddleware,
    getOneUser
   );
user.get('/inbox', 
    authMiddleware,
    fetchUserInbox
   );
user.post('/uploadProfileImg', 
      authMiddleware,
      upload.single('file'),
      uploadProfileAvatar
   );


export default user;
