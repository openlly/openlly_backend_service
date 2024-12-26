"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createAnswer_1 = __importDefault(require("./controller/createAnswer"));
const answers = express_1.default.Router();
answers.post('/create', createAnswer_1.default);
exports.default = answers;
