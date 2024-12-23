import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, (req as any).time);
  next();
}