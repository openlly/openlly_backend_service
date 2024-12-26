import {Response,Request} from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import groq from '../../../../../utils/groq/groq';
import { prisma } from '../../../../../prisma/prisma';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const schema = {
    properties: {
      usernames: {
        title: "Usernames",
        type: "array",
        items: { type: "string" },
      },
    },
    required: ["usernames"],
    title: "Usernames Schema",
    type: "object",
  };
  
export default async function generateUsername(req: Request, res: Response) {


    try {
       const response=await groq.chat.completions.create({
        
         messages: [
            {
                role: "system",
                content:`
                You are a helpful assistant that specializes in generating unique and cool usernames. Please ensure the usernames meet the following criteria:
                 - Every username should contain minium 2 alphanumeric characters.
                 - Use themes like meme culture, Bollywood/Hollywood references, trending topics, or anything unique and engaging as inspiration.
                 - Must have a minimum length of 3 characters and a maximum length of 10 characters.
                 - Should align with Indian Instagram username trends.
                 - can be used abusive word but must be reprashed for example "bitch" should be replaced with "bitchy".
                 - use dark humor.
                 - make it cacheable.
                 - Must be unique.

                The JSON response must strictly adhere to the following schema:
                ${JSON.stringify(schema, null, 2)}
                The application, "Openlly," is designed for Gen Z to ask questions and get anonymous answers. Therefore, the usernames should reflect creativity, modern trends, and cultural relevance.
                Ensure all usernames are fresh, creative, and can relate to any topic, app theme, or target audience. Return the output in a structured JSON object, as per the schema mentioned.

                `
              },
                // Set a user message for the assistant to respond to.
            {
                role: "user",
                content: 'Generate usernames',
                
            },
            ],
            model: "llama3-8b-8192",
            response_format: { type: "json_object" },
            stream: false,
        });
        //parse json

        const parsedResponse = JSON.parse(response.choices[0].message.content??"{}");
        //stored in db
        try {
            await prisma.username.createMany({
                data: parsedResponse.usernames.map((username: string) => ({ id: uuidv4(), username })),
                skipDuplicates: true,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                // ignore if duplication error occurred
            } else {
                throw error;
            }
        }
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'success',
            data: parsedResponse
        });
    } catch (error) {
        console.error(error);
        apiResponseHandler(res, {
            statusCode: 500,
            hasError: true,
            message: 'Something went wrong',
        }); 
    }

}