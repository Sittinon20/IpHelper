export const Authen = (response, next) => {
  if (window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.email));
  }
  next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

export const getUser = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return false;
    }
  }
};
