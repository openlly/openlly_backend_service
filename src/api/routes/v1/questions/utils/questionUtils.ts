import dotenv from 'dotenv';
dotenv.config();
export const questionUrl = (questionId: string,userId: string) => `${process.env.BASE_URL}/${questionId}/${userId}`;
