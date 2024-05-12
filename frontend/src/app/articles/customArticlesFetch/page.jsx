"use client";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie } from "@/actions/auth";
import { getProfile, updateProfile, updateUserPassword } from "@/actions/user";
// import Message from "@/components/Message";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import { customScrape } from "@/actions/scrape";

import { allArticles,searchArticles } from "@/actions/article";
// import { useState, useEffect } from "react";
// import { getCookie } from "@/actions/auth";
// import Modal from "@/components/Modal";
// import SearchProduct from "@/components/SearchProduct";

import ProductCard from "@/components/ProductCard";
import { brands } from "@/constants";
import { basicScrape,scrapeOne } from "@/actions/scrape";
import { newBasicScrape,newScrapeOne } from "@/actions/newScrape";
// import SideBar from "@/components/SideBar";

const CustomArticlesFetch = () => {
  const [values, setValues] = useState({
    // username: "",
    // email: "",
    // country: "",
    // streetAddress: "",
    // city: "",
    // region: "",
    // postalCode: "",
    // description: "",
    // formData: "",
    customFetch:true,
    publisher:"",
    link:""
  });

  const [userId, setUserId] = useState();
  const searchParams = useSearchParams();

  const [refresh, setRefresh] = useState(false);

//   const [authValues, setAuthValues] = useState({
//     currentPassword: "",
//     password: "",
//     confirmPassword: "",
//   });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });
  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const resetFilter = ()=>{
    setValues({...values,link:"",publisher:""})
  }
  const {
    // username,
    // email,
    // country,
    // streetAddress,
    // city,
    // postalCode,
    // region,
    // description,
    // formData,
    publisher,
    link
  } = values;

  useEffect(() => {
    // setAlert({ ...alert, loading: true });

    // initialProfileData();
  }, [refresh]);

//   const initialProfileData = async () => {
//     let token = getCookie("token_user");
//     // console.log(searchParams.get("userid"));
//     // let userIdTemp = searchParams.get("userId");
//     let userIdTemp;
//     if (localStorage.getItem("user")) {
//       userIdTemp = JSON.parse(localStorage.getItem("user"))._id;
//     }
//     console.log(userIdTemp);
//     setUserId(userIdTemp);

//     await getProfile(userIdTemp, token)
//       .then((data) => {
//         if (data.status && data.status == "success") {
//           console.log(data);
//           setValues({
//             // ...values,
//             // ...data.doc,
//             username: data.doc.username,
//             email: data.doc.email,
//             formData: new FormData(),
//             images: data.doc.images,
//             country: data.doc.country,
//             streetAddress: data.doc.streetAddress,
//             city: data.doc.city,
//             region: data.doc.region,
//             postalCode: data.doc.postalCode,
//             description: data.doc.description,
//           });

//           setAlert({
//             ...alert,
//             loading: false,
//             message: data.message,
//             error: false,
//             success: true,
//           });

//           window.setTimeout(() => {
//             setAlert({ ...alert, success: false, message: "" });
//           }, 1000);
//         }
//       })
//       .catch((err) => {
//         console.log(err);

//         setAlert({
//           ...alert,
//           loading: false,
//           message: data.message,
//           error: true,
//           success: false,
//         });
//       });
//   };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;

    if (name == "images") {
      console.log(name, value, "workin..");
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    // e.preventDefault();
    setAlert({ ...alert,message:"Please check Custom articles after a few moment...", loading: true });
    let token = getCookie("token_user");

    let data = {
    //   username,
    //   email,
    //   country,
    //   streetAddress,
    //   city,
    //   postalCode,
    //   region,
    //   description,
      publisher,
      link
    };

    // for (const key in data) {
    //   formData.append(key, data[key]);
    //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    // console.log(userId, "from update submit");

    await customScrape(values)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setRefresh(!refresh);

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
            resetFilter()
          }, 1000);
          // router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
        resetFilter()
      });
  };

  // update password

//   const { currentPassword, password, confirmPassword } = authValues;

//   const handleAuthChange = (name) => (e) => {
//     e.preventDefault();
//     setAuthValues({ ...authValues, [name]: e.target.value });
//   };

//   const handleAuthSubmit = async (e) => {
//     e.preventDefault();
//     setAlert({ ...alert, loading: true });

//     let token = getCookie("token_user");

//     let data = {
//       passwordCurrent: currentPassword,
//       password,
//       passwordConfirm: confirmPassword,
//     };

//     await updateUserPassword(userId, data, token)
//       .then((data) => {
//         if (data.status && data.status == "success") {
//           setAuthValues({
//             ...authValues,
//             confirmPassword: "",
//             currentPassword: "",
//             password: "",
//           });
//           console.log(data);
//           setRefresh(!refresh);
//           setAlert({
//             ...alert,
//             loading: false,
//             message: data.message,
//             error: false,
//             success: true,
//           });

//           window.setTimeout(() => {
//             setAlert({ ...alert, success: false, message: "" });
//           }, 1000);
//           // routerNew.reload();
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setAlert({
//           ...alert,
//           loading: false,
//           message: err.message,
//           error: true,
//           success: false,
//         });
//       });
//   };



// new-------------------------------------------------------------------------

const [filterValues, setFilterValues] = useState({
  category: "",
  brand: "",
  price: "",
  sort: "",
  publisherFilter:""
});

const [searchValues, setSearchValues] = useState({
  search: "",
});

const { search } = searchValues;

const { category, brand, price, sort,publisherFilter } = filterValues;

const resetFilterArticles = ()=>{
  setFilterValues({sort:"",publisherFilter:""})
  setSearchValues({search:""})
}

const [allData, setAllData] = useState();
const [show, setShow] = useState(false);
const [limit, setLimit] = useState(9);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState();
const [searchClean, setSearchClean] = useState(false);

// const [alert, setAlert] = useState({
//   message: "",
//   error: false,
//   loading: false,
//   success: false,
// });

// const resetAlert = () => {
//   setAlert({ message: "", error: false, loading: false, success: false });
// };
const initialSet = () => {
  setAllData(data);
};

const handleChangeArticles = (name) => (e) => {
  e.preventDefault();
  setFilterValues({ ...filterValues, [name]: e.target.value });
};

const handleSearchArticles = (name) => (e) => {
  e.preventDefault();
  setSearchValues({ ...searchValues, [name]: e.target.value });
};

// ---------------pagination--------------------------
const nextPage = () => {
  setPage((oldPage) => {
    let nextPage = oldPage + 1;
    if (nextPage > totalPages) {
      nextPage = 1;
    }
    return nextPage;
  });
};
const prevPage = () => {
  setPage((oldPage) => {
    let prevPage = oldPage - 1;
    if (prevPage <= 1) {
      prevPage = totalPages;
    }
    return prevPage;
  });
};

// ---------------pagination--------------------------

useEffect(() => {
  if (search.length == 0) {
    setSearchClean(true);
    handleSubmit();
    setSearchClean(false);
  } else {
    handleSearchSubmit();
  }
}, [searchValues]);

const handleSearchSubmit = async () => {
  // e.preventDefault();
  // console.log("triggerd..");
  // console.log(search);
  await searchArticles({ search: search })
    .then((data) => {
      // console.log(data, "from search results");
      // console.log(data);
      if (data.status && data.status == "success") {
        if (data.results == 0) {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        } else {
          setAllData(data.data);
          // console.log(data);
          // let totalCount = data.totalCount;
          // setTotalPages(Math.ceil(totalCount / limit));
          setShow(false);
        }
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: false,
          success: true,
        });

        window.setTimeout(() => {
          resetAlert();
        }, 1000);
      }

      // console.log(allData);
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  // console.log("page changed...", page);

  handleSubmitArticles();
  // console.log(allData);
}, [page, filterValues]);

// const resetFilter = () => {
//   setFilterValues({ category: "", brand: "", price: "", sort: "" });
// };

const handleSubmitArticles = async (e) => {
  if (e) {
    e.preventDefault();
  }
  let params;
  if (searchClean == false) {
    setAlert({ ...alert, loading: true, message: "Loading..." });
  }

  params = {
    limit,
    page,
    customFetch:"true",
   
  };

  if (filterValues?.brand) {
    params.brandName = filterValues.brand;
  }
  if (filterValues?.category) {
    params.category = filterValues.category;
  }
  if (filterValues?.price) {
    params.price = filterValues.price;
  }
  if (filterValues?.sort) {
    params.sort = filterValues.sort;
  }
  if (filterValues?.publisherFilter) {
    params.publisher = filterValues.publisherFilter;
  }
  let token = getCookie("token_user");

  await allArticles(params)
    .then((data) => {
      // console.log(data);
      if (data.status && data.status == "success") {
        if (data.results == 0) {
          setAllData(data.doc);
          // if (searchClean == false) {
          //   setAlert({
          //     ...alert,
          //     loading: false,
          //     message: data.message,
          //     error: false,
          //     success: true,
          //   });
          // }

          // window.setTimeout(() => {
          //   resetAlert();
          // }, 1000);
        } else {
          setAllData(data.doc);
          // console.log(data.totalCount);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));
          setShow(false);
        }
        if (searchClean == false) {
          // setAlert({
          //   ...alert,
          //   loading: false,
          //   message: data.message,
          //   error: false,
          //   success: true,
          // });
        }

        window.setTimeout(() => {
          resetAlert();
        }, 1000);
      }

      // return { data };
    })
    .catch((err) => {
      console.log(err);

      setAlert({
        ...alert,
        loading: false,
        message: err.message,
        error: true,
        success: false,
      });
    });
};
  return (
    <>
      <SideBar>
      {alert && alert?.message && <Modal alert={alert} setAlert={resetAlert} />}
      <div className="w-full md:w-full shadow p-5 rounded-lg bg-white mt-16">
      <h2 className="flex items-center px-6 mb-2 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                  All Users
                </h2>
            <div className="relative">
              <div className="absolute flex items-center ml-2 h-full">
                <svg
                  className="w-4 h-4 fill-current text-primary-gray-dark"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                </svg>
              </div>

              <input
                type="text"
                placeholder="Enter the Article Link"
                className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                value={link}
                onChange={handleChange("link")}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Publishers</p>

              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => resetFilter()}
              >
                Reset
              </button>
            </div>

            <div>
              {/* <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"> */}
              <div className=" gap-4 mt-4">
                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  value={publisher}
                  onChange={handleChange("publisher")}
                >
                  <option value="">Select Publisher</option>
                  <option value="scrapes/single/scrapeOneNewsFirst">NewsFirst</option>
                  <option value="scrapes/single/scrapeOneAdaDerana">AdaDerana</option>
                  <option value="scrapes/single/scrapeOneBBC">BBC</option>
                  <option value="scrapes/single/scrapeOneHindustanTimes">HindustanTimes</option>
                  <option value="scrapes/single/scrapeOneNikkei">Nikkei</option>
                  <option value="scrapes/single/scrapeOneTheSun">TheSun</option>
                </select>

         
              </div>
            </div>
            <div className="flex justify-center align-center">

            <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Scrape Article
              </button>
            </div>
        </div>

        <hr />

        <div>

        {alert && alert?.message && <Modal alert={alert} setAlert={resetAlert} />}
      <div className=" mt-4" id="discover">
        {/* <div className="home__text-container">
          <h1 className="text-4xl font-extrabold ">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div> */}

        <div className="home__filters ">
          <div className="w-full md:w-full shadow p-5 rounded-lg bg-white">
            <div className="relative">
              <div className="absolute flex items-center ml-2 h-full">
                <svg
                  className="w-4 h-4 fill-current text-primary-gray-dark"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search Articles"
                className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                value={search}
                onChange={handleSearchArticles("search")}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Filters</p>

              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => resetFilterArticles()}
              >
                Reset Filter
              </button>
            </div>

            <div>
                      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-2  gap-4 mt-4">
                      {/* <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-4  gap-4 mt-4"> */}
                        <select
                          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          value={sort}
                          onChange={handleChangeArticles("sort")}
                        >
                          <option value="">Sort</option>
                          <option value="createdAt">Earliest to Newest</option>
                          <option value="-createdAt">Newest to Earliest</option>
                        </select>
                        {/* <select
                          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          value={brand}
                          onChange={handleChange("brand")}
                        >
                          <option value="">Select Brand</option>
                          {brands.map((branN, index) => {
                            return (
                              <option value={branN} className="capitalize">
                                {branN}
                              </option>
                            );
                          })}
                        </select>

                        <select
                          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          value={quantity}
                          onChange={handleChange("quantity")}
                        >
                          <option value="">Any quantity</option>
                          <option value="0">Out of Stock</option>
                          <option value="10">Less than 10</option>
                          <option value="20">Less than 20</option>
                          <option value="50">Less than 50</option>
                          <option value="100">Less than 100</option>
                        </select> */}
                        <select
                          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          value={publisherFilter}
                          onChange={handleChangeArticles("publisherFilter")}
                        >
                          <option value="">Any Publisher</option>
                          <option value="newsFirst">News First</option>
                          <option value="adaderana">Ada Derana</option>
                          <option value="bbc">BBC</option>
                          <option value="thesun">TheSun</option>
                          <option value="hindustantimes">Hindustan Times</option>
                          <option value="nikkei">Nikkei</option>
                        </select>
                      </div>
                    </div>
{/* 
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  value={category}
                  onChange={handleChange("category")}
                >
                  <option value="">All Type</option>
                  <option value="laptop">LapTop</option>
                  <option value="desktop">DeskTop</option>
                </select>

                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  value={brand}
                  onChange={handleChange("brand")}
                >
                  <option value="">Brand</option>
                  {brands.map((brandN, index) => {
                    return (
                      <option value={brandN} key={index} className="capitalize">
                        {brandN}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  value={price}
                  onChange={handleChange("price")}
                >
                  <option value="">Any Price</option>
                  <option value="50000">Less than 50,000</option>
                  <option value="100000">Less than 100,000</option>
                  <option value="200000">Less than 2000,000</option>
                  <option value="5000000">Less than 500,000</option>
                  <option value="100000">Less than 100,0000</option>
                </select>

                <select
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                  value={sort}
                  onChange={handleChange("sort")}
                >
                  <option value="">Sort By Price</option>
                  <option value="price">Price Low - High</option>
                  <option value="-price">Price High - Low</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div>
        <div>
          <h2 className="text-bold text-2xl p-10 rounded text-white bg-gray-300 cursor-pointer" onClick={basicScrape}>BASIC SCRAPE</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"NewsFirst"})}>NewsFirst</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"AdaDerana"})}>AdaDerana</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"BBC"})}>BBC</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"TheSun"})}>TheSun</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"HindustanTimes"})}>HindustanTimes</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"Nikkei"})}>Nikkei</h2>
        </div>
        </div> */}
        {/* <div className="m-2 p-2">
          <h2>This is the new one bithchess.....</h2>
        <div>
          <h2 className="text-bold text-2xl p-10 rounded text-white bg-gray-300 cursor-pointer" onClick={newBasicScrape}>BASIC SCRAPE</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"NewsFirst"})}>NewsFirst</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"AdaDerana"})}>AdaDerana</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"BBC"})}>BBC</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"TheSun"})}>TheSun</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"HindustanTimes"})}>HindustanTimes</h2>
        </div>
        <div>
          <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>newScrapeOne({scrapeSite:"Nikkei"})}>Nikkei</h2>
        </div>
        </div> */}

        {allData && allData.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allData?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>

            {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allData?.message}</p>
          </div>
        )}
      </div>
      <div
        aria-label="Page navigation example"
        className="flex justify-center my-5"
      >
        <ul className="inline-flex -space-x-px">
          <li>
            <a
              href="#"
              onClick={prevPage}
              className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          {[...Array(totalPages)].map((val, index) => {
            return (
              <li key={index}>
                <a
                  href="#"
                  onClick={() => setPage(index + 1)}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {index + 1}
                </a>
              </li>
            );
          })}

          {/* <li>
              <a
                href="#"
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>

            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li> */}
          <li>
            <a
              href="#"
              onClick={nextPage}
              className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
        </div>


      </SideBar>
    </>
  );
};

export default CustomArticlesFetch;