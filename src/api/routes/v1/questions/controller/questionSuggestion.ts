import { Response, Request } from 'express';

import apiResponseHandler from '../../../../../utils/apiResponseHandler';
import { prisma } from '../../../../../prisma/prisma';
import { buildOpenAIQuery } from '../../../../../utils/openai/openai';
import  { getStaticQuestion, responseCache } from '../../../../../utils/data/question_suggestion';
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
  const id = req.params.id;

  if (!id) {
    apiResponseHandler(res, {
      statusCode: 400,
      hasError: true,
      message: 'id is required',
    });
    return;
  }

  try {
    // Get question details with caching optimization
    const questionDetail = await prisma.question.findUnique({
      where: { id },
      select: {
        title: true,
        content: true
      }
    });

    if (!questionDetail) {
      apiResponseHandler(res, {
        statusCode: 404,
        hasError: true,
        message: 'Question not found',
      });
      return;
    }

    // Function to get a unique response
    const getUniqueResponse = (maxAttempts = 3): string | null => {
      for (let i = 0; i < maxAttempts; i++) {
        const response = getStaticQuestion(questionDetail.title);
        if (response && !responseCache.isResponseRecent(id, response)) {
          responseCache.addResponse(id, response);
          return response;
        }
      }
      return null;
    };

    // Try to get a unique static question first
    const staticQuestion = getUniqueResponse();
    if (staticQuestion) {
      apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Question suggestion fetched successfully',
        data: staticQuestion,
      });
      return;
    }

    // If no static question or all recent ones used, use AI generation
    const systemPrompt = `You are an empathetic AI assistant helping generate engaging and thoughtful anonymous responses for a social media plateform called "Openlly". Your task is to create responses that are:

    1. Personal and Authentic:
    - Share experiences and feelings that feel genuine
    - Use a conversational, friendly tone
    - Include relatable examples when appropriate

    2. Respectful and Constructive:
    - Maintain a positive or constructive tone even with critical feedback
    - Avoid harmful or offensive content
    - Focus on growth and improvement

    3. Engaging and Thoughtful:
    - Provide detailed, meaningful responses
    - Include specific examples or suggestions
    - Ask follow-up questions when appropriate

    4. Context-Aware:
    - Consider both the question title and description
    - Match the tone to the question type
    - Use appropriate language for the platform

    Question Categories and Response Styles:
    - TBH: Honest but kind feedback
    - Confessions: Personal stories or experiences
    - Ask Me Anything: Detailed, informative answers
    - Never Have I Ever: Interesting experiences or wishes
    - 3 Words: Concise, meaningful descriptions

    The response should be 2-3 sentences long and feel like it's coming from a real person sharing anonymously.

    The JSON response must strictly adhere to the following schema:
    ${JSON.stringify(schema, null, 2)}`;

    const userPrompt = `Generate a thoughtful anonymous response for: Title: "${questionDetail.title}", Description: "${questionDetail.content}".`;

    const response = await buildOpenAIQuery([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]);

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

    // Check if the AI-generated response is recent
    if (responseCache.isResponseRecent(id, answer)) {
      // If it's recent, try to get a different response
      apiResponseHandler(res, {
        statusCode: 200,
        hasError: false,
        message: 'Question suggestion fetched successfully',
        data: 'Let me think about that for a moment... Ask again for a fresh perspective!',
      });
      return;
    }

    // Cache and return the new response
    responseCache.addResponse(id, answer);
    
    apiResponseHandler(res, {
      statusCode: 200,
      hasError: false,
      message: 'Question suggestion fetched successfully',
      data: answer,
    });

  } catch (e) {
    console.error('Error in question suggestion:', e);
    apiResponseHandler(res, {
      statusCode: 500,
      hasError: true,
      message: 'Error in getting question suggestion',
    });
  }
}