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

  let oldWrite = res.write;
  let oldEnd = res.end;
  let chunks: any[] = [];

  res.write = function (chunk: any, encoding?: BufferEncoding | string, callback?: Function) {
    chunks.push(chunk);
    return oldWrite.call(res, chunk, encoding as BufferEncoding, callback as ((error: Error | null | undefined) => void));
  } as any;

  res.end = function (chunk?: any, encoding?: BufferEncoding, cb?: () => void) {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding || 'utf8'));
    const body = Buffer.concat(chunks).toString('utf8');
    logger.info({
      res: {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        body: body,
      }
    }, 'Response sent');
    
    return oldEnd.call(res, chunk, encoding as BufferEncoding, cb);
  } as any;

  next();
}