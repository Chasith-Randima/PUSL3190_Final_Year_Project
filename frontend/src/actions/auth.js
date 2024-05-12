import fetch from "isomorphic-fetch";
import cookie from "js-cookie";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const signup = async (user) => {
  console.log(user);
  let url = `${API}/users/signup`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logIn = async (user) => {
  let url = `${API}/users/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logOut = async (next) => {
  removeCookie("token_user");
  removeLocalStorage("user");

  let url = `${API}/users/logout`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, user, next) => {
  if (user == "user") {
    setCookie("token_user", data.token);
    setLocalStorage(user, data.user);
  }
  next();
};

export const isAuth = async (user) => {
  if (typeof window !== "undefined") {
    let cookieChecked;
    if (user == "user") {
      cookieChecked = getCookie("token_user");
    }
    if (cookieChecked) {
      if (localStorage.getItem(user)) {
        return JSON.parse(localStorage.getItem(user));
      } else {
        return false;
      }
    }
  }
};