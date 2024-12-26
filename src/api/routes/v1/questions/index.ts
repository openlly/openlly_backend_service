
import express, {Response, Request} from 'express';
import getQuestion from './controller/getQuestion';
import { authMiddleware } from '../../../middleware/authMiddleware';
import createQuestion from './controller/createQuestion';
import getQuestionById from './controller/getQuestionById';
import deleteQuestion from './controller/deleteQuestion';
import updateQuestion from './controller/updateQuestion';
import getQuestionDetail from './controller/getQuestionDetail';
import questionSuggestion from './controller/questionSuggestion';

const questionRouter = express.Router();

questionRouter.get('/getQuestionDetails',getQuestionDetail)
questionRouter.get('/suggestion/:id',questionSuggestion);
const questions = questionRouter.use(authMiddleware);


questions.get('/',getQuestion);
questions.get('/:id',getQuestionById);
questions.post('/create',createQuestion);
questions.patch('/update/:id',updateQuestion);
questions.delete('/delete/:id',deleteQuestion);


export default questionRouter;
