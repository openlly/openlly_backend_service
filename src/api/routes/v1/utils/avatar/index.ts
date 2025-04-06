
import { authMiddleware } from '../../../../middleware/authMiddleware';
import express from 'express';
import getAvatar from './controller/getAvatarController';
import createAvatar from './controller/createAvatar';
import createMockAvatar from './controller/createMockAvatar';
const avatarRouter = express.Router();

// Apply auth middleware only to specific routes
avatarRouter.use(authMiddleware);

avatarRouter.get("/", getAvatar);
avatarRouter.post("/", createAvatar);
avatarRouter.post("/multiple", createMockAvatar);

export default avatarRouter;
