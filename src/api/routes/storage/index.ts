import express from 'express';
import getUserProfileImage from './controller/getUserProfileImage';

const storage = express.Router();


storage.get('/profileImage', getUserProfileImage);

export default storage;