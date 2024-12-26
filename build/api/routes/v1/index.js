"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const questions_1 = __importDefault(require("./questions"));
const answer_1 = __importDefault(require("./answer"));
const username_1 = __importDefault(require("./username"));
const v1 = express_1.default.Router();
v1.get('/status', (req, res) => {
    res.json({ status: 'API v1 is up and running' });
});
v1.use('/auth', auth_1.default);
v1.use('/user', user_1.default);
v1.use('/question', questions_1.default);
v1.use('/answer', answer_1.default);
v1.use('/username', username_1.default);
exports.default = v1;
