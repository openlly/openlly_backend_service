import express from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware';
import { fetchUserInbox } from './controller/fetchUserInbox';
import inboxSeen from './controller/inboxSeen';
import inboxSeenSingle from './controller/inboxSeenSingle';

const inbox = express.Router();

inbox.use(authMiddleware);

inbox.get('/', fetchUserInbox);
inbox.get('/seen',inboxSeen);
inbox.get('/seen/:id',inboxSeenSingle);



export default inbox;
