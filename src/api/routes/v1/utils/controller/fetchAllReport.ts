import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';

//create fetchAllReport function    
export default async function fetchAllReport(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const reports = await prisma.report.findMany({
            skip,
            take: limit,
            include: {
                response: true
            }
        });

        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: reports
        });

        apiResponseHandler(res, {
            hasError: false,
            statusCode: 200,
            message: 'success',
            data: reports,
        });
    } catch (error) {
        apiResponseHandler(res, {
            hasError: true,
            statusCode: 500,
            message: 'Internal Server Error',
        });
    }
}