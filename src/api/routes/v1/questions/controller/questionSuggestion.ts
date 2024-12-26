import {Response, Request} from 'express';

import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import groq from '../../../../../utils/groq/groq';

const schema = {
    type: "object",
    properties: {
      answer: {
        type: "string",
      },
    },
    required: ["answer"],
  };
export default async function questionSuggestion(req: Request, res: Response) {
    //check if parm exists :/id
    const id = req.params.id;   
    
    if(!id){
        apiResponseHandler(res, {    
            statusCode: 400,
            hasError: true,
            message: 'id is required',
        });
        return; 
    }
    //get question detail using question Title 
    const questionDetail = await prisma.question.findUnique({where: {id: id }});
    if(!questionDetail){
        apiResponseHandler(res, {
            statusCode: 404,
            hasError: true, 
            message: 'Question not found',
        });
        return;
    }
    try{
        const response=await groq.chat.completions.create({
            messages: [
               {
                   role: "system",
                   content:`
                   You are a helpful assistant that specializes to answer question related to ${questionDetail.title} 🤔 and qustion content ${questionDetail.content}.
                   Provide a short answer to the question and which grab other user attention. The answer length should be between 40-60 characters. Don't forget to add a bit of humor to it 😄(not always depend upon question seriouness).
                   The JSON response must strictly adhere to the following schema:
                   ${JSON.stringify(schema, null, 2)}
                   `
                 },
                   // Set a user message for the assistant to respond to.
               {
                   role: "user",
                   content: 'Give me answer for question',
               },
               ],
               model: "llama3-8b-8192",
               response_format: { type: "json_object" },
               stream: false,
           });
           const parsedResponse = JSON.parse(response.choices[0].message.content??"{}");
           const answer = parsedResponse.answer;
           apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Question suggestions fetched successfully',
            data: answer,   
        });
          

        

    }catch(e){
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Error in getting question suggestions',
        });
        return;
    }   

}