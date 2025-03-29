
import { Request, Response } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';

import { prisma } from '../../../../../prisma/prisma';
import { createReportSchema } from '../schema/createReportSchema';
import { v4 as uuidv4 } from 'uuid';


const createReport = async (req: Request, res: Response) => {
    try {
        const { inboxId, type } = createReportSchema.parse(req.body);
        const report = await prisma.report.create({
            data: {
                id: uuidv4(),
                responseId: inboxId,
                type,
            },
        });
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Report created successfully',
            data: report,
        });
    } catch (error) {
        console.log("error ", error)
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request payload',
        });
    }
}

export default createReport;

