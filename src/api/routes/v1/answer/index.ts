
import express from 'express';
import createAnswer from './controller/createAnswer';


const answers = express.Router();


answers.post('/create', createAnswer);


export default answers;
