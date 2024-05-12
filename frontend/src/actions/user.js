import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";

import { removeCookie, removeLocalStorage } from "./auth";
let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

export const getProfile = (id, token) => {
  // console.log(token, id, "from user action");
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateProfile = (id, user, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(user),
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const updateUser = (id, user, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(user),
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

export const updateUserPassword = (id, user, token) => {
  let url = `${API}/users/updateMyPassword/${id}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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

export const logOutUser = async (next) => {
  removeCookie("token_user");
  removeLocalStorage("user");
  // next();
  let url = `${API}/users/logout`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log("Logout Success");
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getAllUsers = (paramsData, token) => {
  let url = `${API}/users`;
  let userRole;

  // if (paramsData?.role && paramsData?.role == "user") {
  //   userRole = { "": paramsData.role };
  // } else {
  //   userRole = { role: paramsData.role };
  // }

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      page: paramsData.page,
      limit: paramsData.limit,
      // category: paramsData.category,
      // brandname: paramsData.brandname,
      // "price[lte]": paramsData.price,
      // "quantity[lte]": paramsData.quantity,
      // "createdAt[gte]": paramsData.createdAt,
      // "createdAt[lte]": paramsData.increasedDate,
      role: paramsData.role,

      //   name: paramsData.name,
      //   city: paramsData.city,
      //   brandname: paramsData.brandname,
      //   Product: paramsData.Product,
      //   "price[gte]": paramsData.priceMin,

      sort: paramsData.sort,
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const oneUser = (id) => {
  let url = `${API}/users/${id}`;

  return axios(url, {
    method: "GET",
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const updateProduct = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/users/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deleteUser = async (id, token) => {
  let url = `${API}/users/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const searchUsers = (params) => {
  // console.log(params);
  let query = queryString.stringify(params);
  // console.log(query);
  let url = `${API}/users/search?${query}`;
  // console.log(url);

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};