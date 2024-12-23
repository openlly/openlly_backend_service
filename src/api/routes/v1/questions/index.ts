
import express, {Response, Request} from 'express';
import getQuestion from './controller/getQuestion';
import { authMiddleware } from '../../../middleware/authMiddleware';
import createQuestion from './controller/createQuestion';
import getQuestionById from './controller/getQuestionById';
import deleteQuestion from './controller/deleteQuestion';
import updateQuestion from './controller/updateQuestion';

const questions = express.Router();


questions.get('/',getQuestion);
questions.get('/:id',getQuestionById);

const questionProtactivePaths= questions.use(authMiddleware);
questionProtactivePaths.post('/create',createQuestion);
questionProtactivePaths.patch('/update/:id',updateQuestion);
questionProtactivePaths.delete('/delete/:id',deleteQuestion);


export default questions;
