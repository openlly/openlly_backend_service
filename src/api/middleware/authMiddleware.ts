import { verifyAccessToken } from '../../utils/jwt/jwtHelper';
import { Response,Request,NextFunction } from 'express';
import apiResponseHandler from '../../utils/apiResponseHandler';
import { TokenExpiredError } from 'jsonwebtoken';
 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return apiResponseHandler(res, {
      statusCode: 401,
      hasError: true,
      message: 'Authorization header is missing',
    });
  }

  try{
    const decodedToken = verifyAccessToken(token);
    if(!decodedToken){
      return apiResponseHandler(res, {
        statusCode: 401,
        hasError: true,
        message: 'Invalid token',
      })
    }
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    next();
  }catch(error){
    if(error instanceof TokenExpiredError){
      return apiResponseHandler(res, {
        statusCode: 401,
        hasError: true,
        message: error.message,
        tokenExpired: true  
      })
    }
    return apiResponseHandler(res, {
      statusCode: 401,
      hasError: true,
      message: 'Invalid token',
    })
  }
 
};

