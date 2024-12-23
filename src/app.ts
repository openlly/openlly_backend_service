import express, { Request, Response, NextFunction } from 'express';
import v1 from './api/routes/v1';

import bodyParser from 'body-parser';
import { loggerMiddleware } from './api/middleware/loggerMiddleware';

import { connectDB } from './prisma/prisma';
import { connectRedis } from './redis/redis';
import storage from './api/routes/storage';
import questions from './api/routes/v1/questions/';

const app = express();


app.use(bodyParser.json());

connectDB();

connectRedis();




app.use('/storage',storage)




// Simple route at the root
app.get('/', (req: Request, res: Response) => { 
  res.send('Hello World!');
});

app.use('/api/v1', v1, (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

// logger middleware
app.use(loggerMiddleware);







app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;