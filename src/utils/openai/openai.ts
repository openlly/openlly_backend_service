import OpenAI from "openai";
import { appConfig } from "../appConfig";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
    apiKey: appConfig.OPENAI_API_KEY,
    baseURL: appConfig.OPENAI_API_BASE_URL,
});
if (!openai) {
    console.error('OPENAI_API_KEY is not defined');
    process.exit(1);
}
export async function buildOpenAIQuery(prompts: ChatCompletionMessageParam[]): Promise<string | Error> {
    try {
        const result = await openai.chat.completions.create({
            model: appConfig.OPENAI_MODEL,
            messages: prompts,
            response_format: { type: "json_object" },
        });
        if (result.choices[0].message.content) {
            return result.choices[0].message.content;
        }
        throw new Error(`OpenAI response is empty ${result}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error in OpenAI API call:', error);
            return new Error(`OpenAI API call failed: ${error.message}`);
        } else {
            console.error('Unknown error in OpenAI API call:', error);
            return new Error('OpenAI API call failed with an unknown error');
        }
    }
}
