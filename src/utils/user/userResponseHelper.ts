
export const userResponseHandler = (user: any) => {
  const { password, ...rest } = user;

  if (user) {
    user = rest;
  }



   user = Object.fromEntries(
    Object.entries(user).map(([key, value]) => {
      return value === null ? [key, undefined] : [key, value];
    })
  );


  return user;
};
