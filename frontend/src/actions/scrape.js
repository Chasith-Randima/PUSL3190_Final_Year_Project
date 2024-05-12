import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_ArticleION == true) {
  API = process.env.NEXT_PUBLIC_API_ArticleION;
}

// export const createArticle = async (data, token) => {
//   console.log(token);
//   let url = `${API}/articles/`;
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: data,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

export const basicScrape = (paramsData) => {
  API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT
  let url = `${API}/scrapes`;

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
       all:"all",
      // createdAt: paramsData.createdAt,

      //   name: paramsData.name,
      //   city: paramsData.city,
      //   brandname: paramsData.brandname,
      //   Article: paramsData.Article,
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
export const scrapeOne = (paramsData) => {
  let API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT
  let url = `${API}/scrapes/scrape${paramsData.scrapeSite}`;

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
      //   Article: paramsData.Article,
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

export const customScrape = (paramsData) => {
  API = process.env.NEXT_PUBLIC_SCRAPE_API_DEVELOPMENT
  let url = `${API}/${paramsData.publisher}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paramsData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};


// export const customScrape = (paramsData) => {
//   let url = `${API}/${paramsData.publisher}`;

//   return axios(url, {
//     method: "POST",
//     // params: { ...query },
//     params: {
//       page: paramsData.page,
//       limit: paramsData.limit,
//       category: paramsData.category,
//       brandName: paramsData.brand,
//       "price[lte]": paramsData.price,
//       "quantity[lte]": paramsData.quantity,
//       // createdAt: paramsData.createdAt,

//       //   name: paramsData.name,
//       //   city: paramsData.city,
//       //   brandname: paramsData.brandname,
//       //   Article: paramsData.Article,
//       //   "price[gte]": paramsData.priceMin,

//       sort: paramsData.sort,
//     },
//   })
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };


// export const oneArticle = (id) => {
//   let url = `${API}/articles/${id}`;

//   return axios(url, {
//     method: "GET",
//   })
//     .then((response) => {
//       console.log(response.data);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const updateArticle = async (id, data, token) => {
//   console.log(id, data, token);
//   let url = `${API}/articles/${id}`;
//   return fetch(url, {
//     method: "PATCH",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     body: data,
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const deleteArticle = async (id, token) => {
//   let url = `${API}/articles/${id}`;
//   return fetch(url, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const searchArticles = (params) => {
//   // console.log(params);
//   let query = queryString.stringify(params);
//   // console.log(query);
//   let url = `${API}/articles/search?${query}`;
//   // console.log(url);

//   return fetch(url, {
//     method: "GET",
//   })
//     .then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };