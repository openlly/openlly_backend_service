import apiResponseHandler from "../../../../../utils/apiResponseHandler";
import { prisma } from "../../../../../prisma/prisma";
import { Request, Response } from "express";

export default async function getUsername(req: Request, res: Response) {

    try {
        // Fetch usernames from the database where `usedAt` is null
        const usernames = await prisma.username.findMany({
            where: { usedAt: null },
        });

        // Parse usernames to a string array
        const parsedUsernames = usernames.map((username) => username.username);

        // Shuffle the array to randomize
        const shuffledUsernames = parsedUsernames.sort(() => Math.random() - 0.5);

        // Handle case when no usernames are found
        if (shuffledUsernames.length === 0) {
            apiResponseHandler(res, {
                statusCode: 404,
                hasError: true,
                message: 'Username not found',
            });
            return;
        }

        // Select the first 3 usernames, ensuring the length is no more than 3
        const randomUsernames = shuffledUsernames.slice(0, 5);
        //lowercase
        randomUsernames.forEach((username, index) => {
            randomUsernames[index] = username.toLowerCase();
        }); 

        // Return randomized usernames (up to 3)
        apiResponseHandler(res, {
            statusCode: 200,
            hasError: false,
            message: 'Username found',
            data: randomUsernames,
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
