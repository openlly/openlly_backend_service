"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateUsername_1 = __importDefault(require("./controller/validateUsername"));
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const generateUsername_1 = __importDefault(require("./controller/generateUsername"));
const getUsername_1 = __importDefault(require("./controller/getUsername"));
const username = express_1.default.Router();
username.use(authMiddleware_1.authMiddleware);
username.get('/validateUsername', validateUsername_1.default);
username.get('/generateUsername', generateUsername_1.default);
username.get('/getUsername', getUsername_1.default);
exports.default = username;
