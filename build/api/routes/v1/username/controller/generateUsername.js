"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateUsername;
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const groq_1 = __importDefault(require("../../../../../utils/groq/groq"));
const prisma_1 = require("../../../../../prisma/prisma");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
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
function generateUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield groq_1.default.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `
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
            const parsedResponse = JSON.parse((_a = response.choices[0].message.content) !== null && _a !== void 0 ? _a : "{}");
            //stored in db
            try {
                yield prisma_1.prisma.username.createMany({
                    data: parsedResponse.usernames.map((username) => ({ id: (0, uuid_1.v4)(), username })),
                    skipDuplicates: true,
                });
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                    // ignore if duplication error occurred
                }
                else {
                    throw error;
                }
            }
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'success',
                data: parsedResponse
            });
        }
        catch (error) {
            console.error(error);
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 500,
                hasError: true,
                message: 'Something went wrong',
            });
        }
    });
}
