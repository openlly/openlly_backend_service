import {Response, Request} from 'express';  
import {createAnswerSchema} from '../schema/answerSchema';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { v4 as uuidv4 } from 'uuid';

export default async function createAnswer(req: Request, res: Response) {
    const schema = await createAnswerSchema.safeParseAsync(req.body);
    if(!schema.success){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid request body',
        });
        return;
    }   
    let formatedRevealTime = null;
    if(schema.data.revealTime){
       try{
        const selectedTime = new Date(schema.data.revealTime);
        formatedRevealTime = selectedTime;
        const currentTime = new Date();
        const timeDifference = (selectedTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60); // difference in hours
    
        if (isNaN(selectedTime.getTime()) || timeDifference < 2 || timeDifference > 48) {
            apiResponseHandler(res, {
                statusCode: 400,
                hasError: true,
                message: 'Invalid reveal time. It must be between 2 and 48 hours from now.',
            });
            return;
        }
       }catch(e){
        apiResponseHandler(res, {
            statusCode: 400,
            hasError: true,
            message: 'Invalid reveal time. It must be between 2 and 48 hours from now.',
        });
        return;
       }
    }
   
     
    

    const question = await prisma.question.findUnique({where: {id: schema.data.questionId}});
    if(!question){
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'Question not found',
        });
        return;
    }
    
    const user = await prisma.user.findUnique({where: {id: schema.data.answerTo}});
    if(!user){
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true,
            message: 'User not found',
        });
        return;
    }

    const answer = await prisma.response.create({
        data: {
            id: uuidv4(),
            content: schema.data.content,
            questionId: schema.data.questionId,
            answerTo: schema.data.answerTo,
            createdAt: new Date(),
            updatedAt: new Date(),
            hint: schema.data.hint,
            ackEmail: schema.data.notifEmail,
            sendIdentity: schema.data.userIdentity,
            selectedTime: formatedRevealTime,
        },        
    });
    console.log("answer", answer);

    apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'success',
        data: null,
    }); 
    
   

}