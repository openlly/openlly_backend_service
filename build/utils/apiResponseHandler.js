"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = apiResponseHandler;
var APIResponseStatus;
(function (APIResponseStatus) {
    APIResponseStatus[APIResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    APIResponseStatus[APIResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    APIResponseStatus[APIResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    APIResponseStatus[APIResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    APIResponseStatus[APIResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    APIResponseStatus[APIResponseStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(APIResponseStatus || (APIResponseStatus = {}));
const defaultMessages = {
    [APIResponseStatus.BAD_REQUEST]: 'Bad Request',
    [APIResponseStatus.UNAUTHORIZED]: 'Unauthorized access',
    [APIResponseStatus.FORBIDDEN]: 'Forbidden access',
    [APIResponseStatus.NOT_FOUND]: 'Resource not found',
    [APIResponseStatus.SERVER_ERROR]: 'Internal server error',
};
const removeEmptyValues = (obj) => {
    // Remove null, undefined, and empty string values
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined && v !== ''));
};
function apiResponseHandler(res, { statusCode = APIResponseStatus.SUCCESS, hasError = false, message = '', data = null, tokenExpired = false, }) {
    const isSuccess = !hasError;
    const finalMessage = hasError ? message || 'Something went wrong' : message || 'Success';
    const finalErrorCode = hasError ? defaultMessages[statusCode] : null;
    const finalTokenExpired = tokenExpired || null;
    // Default API response structure
    const apiResponse = {
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
    // Log response
    console.log('API Response:', cleanedResponse);
    // Send the API response
    return res.status(apiResponse.status).json(cleanedResponse);
}
