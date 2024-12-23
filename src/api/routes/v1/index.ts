import express, { Request, Response } from 'express';
import auth from './auth';
import user from './user';  
import questions from './questions';
import answers from './answer';



const v1 = express.Router();


v1.get('/status', (req: Request, res: Response) => {
    res.json({ status: 'API v1 is up and running' });
});

v1.use('/auth', auth);
v1.use('/user', user);
v1.use('/question',questions);
v1.use('/answer', answers);

export default v1;  

