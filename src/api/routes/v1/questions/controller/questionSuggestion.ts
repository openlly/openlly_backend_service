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
        const response = await groq.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `
                You are a helpful assistant that specializes in asking engaging and thought-provoking questions related to ${questionDetail.title} 🤔 and the content of the question: ${questionDetail.content}. 
                Your goal is to craft questions that not only grab attention but also encourage the user to reflect on their life, romantic relationships, college or school experiences, and memorable moments or special days. 
                The question length should be between 40-60 characters. Occasionally, add humor to make the question feel light-hearted 😄 (but adjust based on the question's seriousness).
                The JSON response must strictly adhere to the following schema:
                ${JSON.stringify(schema, null, 2)}
                `
              },
              {
                role: "user",
                content: 'Give me an answer for the question.',
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