"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionUrl = void 0;
const appConfig_1 = require("../../../../../utils/appConfig");
const toCamelCase = (str) => str
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0)
        return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
})
    .replace(/\s/g, "");
const questionUrl = (questionTitle, username) => `${appConfig_1.appConfig.BASE_URL}/${username}/${toCamelCase(questionTitle)}`;
exports.questionUrl = questionUrl;
