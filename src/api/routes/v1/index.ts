import express, { Request, Response } from 'express';
import auth from './auth';
import user from './user';  
import questionRouter from './questions';
import answers from './answer';
import username from './username';



const v1 = express.Router();


v1.get('/status', (req: Request, res: Response) => {
    res.json({ status: 'API v1 is up and running' });
});

v1.use('/auth', auth);
v1.use('/user', user);
v1.use('/question',questionRouter);
v1.use('/answer', answers);
v1.use('/username', username);

export default v1;  

