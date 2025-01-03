import { verifyToken } from '../../utils/jwt/jwtHelper';
import { Response,Request,NextFunction } from 'express';
import apiResponseHandler from '../../utils/apiResponseHandler';
 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return apiResponseHandler(res, {
      statusCode: 401,
      hasError: true,
      message: 'Authorization header is missing',
    });
  }

  const decodedToken = verifyToken(token);

  if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
    return apiResponseHandler(res, {
      statusCode: 401,
      hasError: true,
      message: decodedToken ? 'Token expired' : 'Invalid token',
      tokenExpired: !!decodedToken,
    });
  }  
  req.userId = decodedToken.userId;
  
  next();
};

