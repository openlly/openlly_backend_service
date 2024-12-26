import { appConfig } from "../../../../../utils/appConfig";
const toCamelCase = (str: string) =>
    str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        })
        .replace(/\s/g, "");
export const questionUrl = (questionTitle: string, username: string) =>
    `${appConfig.BASE_URL}/${username}/${toCamelCase(questionTitle)}`;
