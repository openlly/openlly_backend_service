import { appConfig } from "../../../../../utils/appConfig";
export const questionUrl = (questionId: string,userId: string) => `${appConfig.BASE_URL}/${questionId}/${userId}`;
