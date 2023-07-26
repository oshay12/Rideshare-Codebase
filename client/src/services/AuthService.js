export const getUser = () => {
  // user object, recognizes user and grants auth
  const auth = JSON.parse(window.localStorage.getItem("login.auth"));
  if (auth) {
    // if user has auth
    const [, payload] = auth.access.split("."); // access
    const decoded = window.atob(payload); // decodes the encoded 'payload' object
    return JSON.parse(decoded); // returns the parsed decoded user access
  }
  return undefined; // if user doesn't have auth, return undefined, aka no value
};
 
export const isDriver = () => {
  // if the user is a driver, user group is set to driver
  const user = getUser();
  return user && user.group === "driver";
};

export const isRider = () => {
  // if the user is a rider, user group is set to rider
  const user = getUser();
  return user && user.group === "rider";
};

export const getAccessToken = () => {
  // gets auth access token
  const auth = JSON.parse(window.localStorage.getItem("login.auth"));
  if (auth) {
    return auth.access;
  }
  return undefined;
};
