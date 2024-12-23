import { appConfig } from "./appConfig";

export const userResponseHandler = (user: any) => {
  const { password, ...rest } = user;
  const profileImage = rest.profileImg;
  rest.profileImg = profileImage
    ? `${appConfig.BASE_URL}/storage/profileImage?id=${profileImage}`
    : null;
  return rest;
};
