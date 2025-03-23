import express, { Request, Response } from 'express';
import auth from './auth';
import user from './user';  
import questionRouter from './questions';
import answers from './answer';
import username from './username';
import contactRouter from './contact';
import inbox from './inbox';


const v1 = express.Router();


v1.get('/status', (req: Request, res: Response) => {
    res.json({ status: 'API v1 is up and running' });
});

v1.use('/auth', auth);
v1.use('/user', user);
v1.use('/question',questionRouter);
v1.use('/answer', answers);
v1.use('/username', username);
v1.use('/contact',contactRouter);
v1.use('/inbox',inbox);
export default v1;  

