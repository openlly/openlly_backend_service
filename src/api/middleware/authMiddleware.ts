import { verifyToken } from '../../utils/jwt/jwtHelper';
import apiResponseHandler from '../../utils/apiResponseHandler';

export const authMiddleware = (req: any, res: any, next: any) => {
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

  req.user = decodedToken;
  next();
};
