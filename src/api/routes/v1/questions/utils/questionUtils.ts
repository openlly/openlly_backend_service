import { appConfig } from "../../../../../utils/appConfig";

export const questionUrl = (questionAbrbreviation: string, username: string) =>
    `${appConfig.APP_CLIENT_URL}/${username}/${questionAbrbreviation}`;
