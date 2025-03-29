import { Request, Response } from 'express';
import { prisma } from '../../../../../prisma/prisma';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
export const fetchReportByInboxId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const report = await prisma.report.findMany({
            where: {
                responseId: id,

            },
            include: {
                response: true
            }
        });
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: report
        });
    } catch (error: any) {
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Internal Server Error',
        });
    }
};