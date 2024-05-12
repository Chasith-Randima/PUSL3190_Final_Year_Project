import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_WebsiteION == true) {
  API = process.env.NEXT_PUBLIC_API_WebsiteION;
}

export const createWebsite = async (data, token) => {
  console.log(token);
  let url = `${API}/websites/`;
  return fetch(url, {
    method: "POST",
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

export const allWebsites = (paramsData) => {
  let url = `${API}/websites`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      page: paramsData.page,
      limit: paramsData.limit,
      category: paramsData.category,
      brandName: paramsData.brand,
      "price[lte]": paramsData.price,
      "quantity[lte]": paramsData.quantity,
      // createdAt: paramsData.createdAt,

      //   name: paramsData.name,
      //   city: paramsData.city,
      //   brandname: paramsData.brandname,
      //   Website: paramsData.Website,
      //   "price[gte]": paramsData.priceMin,

      sort: paramsData.sort,
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
export const oneWebsite = (id) => {
  let url = `${API}/websites/${id}`;

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

export const updateWebsite = async (id, data, token) => {
  console.log(id, data, token);
  let url = `${API}/websites/${id}`;
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

export const deleteWebsite = async (id, token) => {
  let url = `${API}/websites/${id}`;
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

export const searchWebsites = (params) => {
  // console.log(params);
  let query = queryString.stringify(params);
  // console.log(query);
  let url = `${API}/websites/search?${query}`;
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