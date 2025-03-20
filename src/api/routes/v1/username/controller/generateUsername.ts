import { Response, Request } from 'express';
import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { buildOpenAIQuery } from '../../../../../utils/openai/openai';

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
        const response = await buildOpenAIQuery([
            {
                role: "system",
                content: `
               You are a creative assistant specializing in generating unique and cool Instagram usernames for Gen Z users in India. Your task is to create usernames for "Openlly," an app for sharing question cards and receiving anonymous messages. Usernames must:
                - Contain at least 2 alphanumeric characters.
                - Be inspired by themes like meme culture, Bollywood/Hollywood, trending topics, or dark humor.
                - Have a length of 3-10 characters.
                - Align with Indian Instagram trends, using Hindi words or cultural references.
                - Include rephrased edgy words (e.g., "bitchy" instead of "bitch") for a playful tone.
                - Be unique and cacheable for reuse.
                - Examples include "MysticMemer," "BollywoodBanter," and "DarkLaughs." 
                - Output in JSON format with usernames and their themes (e.g., "meme culture," "Bollywood reference").
                The JSON response must strictly adhere to the following schema:
                ${JSON.stringify(schema, null, 2)}
                `
            },
            // Set a user message for the assistant to respond to.
            {
                role: "user",
                content: 'Generate 10 unique and cool usernames for the "Openlly" app.',

            },
        ],
        );
        if (response instanceof Error) {
            apiResponseHandler(res, {
                statusCode: 500,
                hasError: true,
                message: response.message,
            });
            return;
        }
        //parse json
        const parsedResponse = JSON.parse(response);
        //list of strings
        const usernames = parsedResponse.usernames.map((username: { username: string, theme: string }) => {
            //make first character lowercase
            return username.username.charAt(0).toLowerCase() + username.username.slice(1);
        });

        //stored in db  
        try {
            await prisma.username.createMany({
                data: usernames.map((username: string) => ({ id: uuidv4(), username })),
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