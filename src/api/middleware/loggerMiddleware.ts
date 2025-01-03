import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    req: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    }
  }, 'Request received');

  res.on('finish', () => {
    logger.info({
      res: {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
      }
    }, 'Response sent');
  });

  next();
}