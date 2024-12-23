import dotenv from 'dotenv';    
dotenv.config();

export const userResponseHandler = (user: any) => {
  const { password, ...rest } = user;
  const profileImage = rest.profileImg;
  rest.profileImg = profileImage
    ? `${process.env.BASE_URL}/storage/profileImage?id=${profileImage}`
    : null;
  return rest;
};
