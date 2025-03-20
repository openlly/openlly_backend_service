import { Response, Request } from 'express';

import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { buildOpenAIQuery } from '../../../../../utils/openai/openai';

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

  if (!id) {
    apiResponseHandler(res, {
      statusCode: 400,
      hasError: true,
      message: 'id is required',
    });
    return;
  }
  //get question detail using question Title 
  const questionDetail = await prisma.question.findUnique({ where: { id: id } });
  if (!questionDetail) {
    apiResponseHandler(res, {
      statusCode: 404,
      hasError: true,
      message: 'Question not found',
    });
    return;
  }
  try {
    const systemPrompt = `You are a creative assistant specializing in generating engaging and thought-provoking question prompts for a social media app called "Openlly." These question prompts will be shared by users on platforms like Instagram and Snapchat, allowing others to respond anonymously.
      Given a question title and description, your task is to craft a concise question prompt that:
      - Is between 40 and 60 characters long (including spaces and punctuation).
      - Is open-ended to encourage detailed, anonymous responses.
      - Encourages personal reflection, confessions, or opinions.
      - Occasionally includes humor, modern slang, or references to current trends or memes, depending on the context.
      - Is relevant to the provided title and description.
      - Appeals to Gen Z users, who are tech-savvy, socially conscious, and value authenticity.

      For example:
      - Title: "Confession"
      - Description: "Send me your confession anonymously"
      - Possible question prompt: "Tell me your most embarrassing moment ever! 😳" (40 characters)

      Another example:
      - Title: "Never have I ever"
      - Description: "Send me your never have I ever questions anonymously"
      - Possible question prompt: "Never have I ever been in love" (40 characters)

      Another example:
      - Title: "3 Words"
      - Description: "Describe me in 3 words anonymously"
      - Possible question prompt: "You are basically a hot mess" (40 characters)

      These are just examples, not all questions will be like this and not same answer you are going to give for every time you need to ask or answer as you are human, ask basic question like love, relationship, life, etc.

      The JSON response must strictly adhere to the following schema:
      ${JSON.stringify(schema, null, 2)}
    `;
    const userPrompt = `Generate a question prompt based on the following title and description: Title: ${questionDetail.title}, Description: ${questionDetail.content}.`;
    const response = await buildOpenAIQuery([
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
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
    const parsedResponse = JSON.parse(response);
    const answer = parsedResponse.answer;
    apiResponseHandler(res, {
      statusCode: 200,
      hasError: false,
      message: 'Question suggestions fetched successfully',
      data: answer,
    });
  } catch (e) {
    apiResponseHandler(res, {
      statusCode: 500,
      hasError: true,
      message: `Error in getting question suggestion ${e}`,
    });
    return;
  }

}