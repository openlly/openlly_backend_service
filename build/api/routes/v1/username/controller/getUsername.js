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
exports.default = getUsername;
const apiResponseHandler_1 = __importDefault(require("../../../../../utils/apiResponseHandler"));
const prisma_1 = require("../../../../../prisma/prisma");
function getUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch usernames from the database where `usedAt` is null
            const usernames = yield prisma_1.prisma.username.findMany({
                where: { usedAt: null },
            });
            // Parse usernames to a string array
            const parsedUsernames = usernames.map((username) => username.username);
            // Shuffle the array to randomize
            const shuffledUsernames = parsedUsernames.sort(() => Math.random() - 0.5);
            // Handle case when no usernames are found
            if (shuffledUsernames.length === 0) {
                (0, apiResponseHandler_1.default)(res, {
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
            (0, apiResponseHandler_1.default)(res, {
                statusCode: 200,
                hasError: false,
                message: 'Username found',
                data: randomUsernames,
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
