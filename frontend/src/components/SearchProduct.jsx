import React from "react";
import { useState } from "react";

import { searchProducts } from "@/actions/product";
import Router from "next/router";
// import Message from "../components/Message";
// import ErrorBoundary from "./ErrorBoundary";

import Modal from "./Modal";
const SearchProduct = ({ search }) => {
  const [values, setValues] = useState({
    searchState: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  let { searchState, results, searched, message } = values;

  const searchSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, message: "loading...", loading: true });

    await searchProducts({ search: searchState })
      .then((data) => {
        if (data.status && data.status == "success")
          setValues({
            ...values,
            results: data.data,
            searched: true,
            message: `${data.data.length} adds found..`,
          });
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: false,
          success: true,
        });
        window.setTimeout(() => {
          setAlert({ ...alert, success: false, message: "" });
        }, 1500);

        // if (data.data.status == "success") {
        //   setRelated([...related, ...data.data.doc]);
        // } else {
        //   setAlert({
        //     ...alert,
        //     loading: false,
        //     message: data.message,
        //     error: data.error,
        //   });
        // }
      })
      .catch((err) => {
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      searchState: e.target.value,
      searched: false,
      results: [],
    });
    searchSubmit(e);
    // console.log(searchState);
    // if (searchState == "") {
    //   setValues({ ...values, results: [], searched: false });
    // }
  };

  const searchResults = (results = []) => {
    return (
      <div
        className={
          search == "mid"
            ? "w-full md:w-1/3 bg-white flex flex-col mt-5 justify-center xl:max-w-xl lg:max-w-lg lg:flex  absolute  md:top-64 left-1/5 md:left-1/3 z-10"
            : "w-1/3 bg-white flex flex-col mt-5 justify-center xl:max-w-xl lg:max-w-lg lg:flex   absolute top-10 left-1/3 z-10"
        }
      >
        {/* {alert.error && <Message message={alert.message} display={true} />} */}
        {alert && alert?.message && (
          <Modal alert={alert.message} resetAlert={resetAlert} />
        )}
        {message && (
          <h3 className="w-2/3 text-primary p-2 justify-self-center mx-auto">
            {message}
            <span
              className="ml-3"
              onClick={() =>
                setValues({
                  ...values,
                  searchState: undefined,
                  results: [],
                  searched: false,
                })
              }
            >
              <i className="fa-sharp text-lg w-10 h-10 fa-solid fa-circle-xmark"></i>
            </span>
          </h3>
        )}
        {results.map((phn, key) => {
          return (
            <h2
              key={key}
              className="w-2/3 p-2 pb-2 justify-self-center mx-auto text-gray-600 font-bold text-bold hover:text-primary cursor-pointer"
              //   onClick={() => Router.push(`/ads/${phn._id}`)}
            >
              {/* {phn.brandname} {phn.model} {phn.condition} */}working
            </h2>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* <ErrorBoundary> */}
      <div
        className={
          search && search == "top"
            ? "w-full xl:max-w-xl lg:max-w-lg lg:flex relative hidden flex"
            : "w-full xl:max-w-xl lg:max-w-lg lg:flex relative  flex"
        }
      >
        <span className="absolute left-4 top-3 text-lg text-gray-400">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          onChange={handleChange}
          className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
          placeholder="Search"
        />
        <button
          className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
          onClick={searchSubmit}
        >
          Search
        </button>

        {/* {searchResults()} */}
      </div>
      {alert.error && <Message message={alert.message} display={true} />}
      {searchState && searchResults(results)}
      {/* </ErrorBoundary> */}
    </>
  );
};

export default SearchProduct;