import { appConfig } from '../appConfig';

export const userResponseHandler = (user: any) => {
  const { password, ...rest } = user;

  if (user) {
    user = rest;
  }

 
  const profileImage = user.profileImg;
  user.profileImg = profileImage
    ? `${appConfig.BASE_URL}/storage/profileImage?id=${profileImage}`
    : null;
   user = Object.fromEntries(
    Object.entries(user).map(([key, value]) => {
      return value === null ? [key, undefined] : [key, value];
    })
  );


  return user;
};
