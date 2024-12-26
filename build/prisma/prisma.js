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
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    let attempt = 0;
    while (attempt < 10) {
        try {
            yield exports.prisma.$connect();
            return;
        }
        catch (error) {
            attempt++;
            console.log(`Error connecting to database, attempt ${attempt} of 10. Error: ${error}`);
            yield new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    throw new Error('Failed to connect to database after 10 attempts');
});
exports.connectDB = connectDB;
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
});
exports.disconnectDB = disconnectDB;
