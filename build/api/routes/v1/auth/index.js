"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController_1 = __importDefault(require("./controller/loginController"));
const signupController_1 = __importDefault(require("./controller/signupController"));
const auth = express_1.default.Router();
auth.post("/login", loginController_1.default);
auth.post("/signup", signupController_1.default);
exports.default = auth;
