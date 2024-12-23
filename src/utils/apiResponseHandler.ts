import { Request, Response } from 'express';

interface APIResponse {
  status: number;
  success: boolean;
  message: string | null;
  data: any | null;
  errorCode: string | null;
  tokenExpired: boolean | null;
}

enum APIResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

const defaultMessages: Record<number, string> = {
  [APIResponseStatus.BAD_REQUEST]: 'Bad Request',
  [APIResponseStatus.UNAUTHORIZED]: 'Unauthorized access',
  [APIResponseStatus.FORBIDDEN]: 'Forbidden access',
  [APIResponseStatus.NOT_FOUND]: 'Resource not found',
  [APIResponseStatus.SERVER_ERROR]: 'Internal server error',
};

const removeEmptyValues = (obj: any) => {
  // Remove null, undefined, and empty string values
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
};

export default function apiResponseHandler(
  res: Response,
  {
    statusCode = APIResponseStatus.SUCCESS,
    hasError = false,
    message = '',
    data = null,
    tokenExpired = false,
  }: {
    statusCode?: number;
    hasError?: boolean;
    message?: string;
    data?: any;
    tokenExpired?: boolean;
  }
): any {
  const isSuccess = !hasError;
  const finalMessage = hasError ? message || 'Something went wrong' : message || 'Success';
  const finalErrorCode = hasError ? defaultMessages[statusCode] : null;
  const finalTokenExpired = tokenExpired || null;

  // Default API response structure
  const apiResponse: APIResponse = {
    status: statusCode,
    success: isSuccess,
    message: finalMessage,
    data: isSuccess ? data : null,
    errorCode: finalErrorCode,
    tokenExpired: finalTokenExpired,
  };

  // Handle error cases based on the status code
  if (hasError) {
    apiResponse.success = false;
  }


  

  // Remove empty values (null, undefined, empty string) from the response
  const cleanedResponse = removeEmptyValues(apiResponse);

  // Send the API response
  return res.status(apiResponse.status).json(cleanedResponse);
}
