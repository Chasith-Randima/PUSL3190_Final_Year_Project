"use client";

import { allArticles,deleteArticle,searchArticles } from "@/actions/article";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import SideBar from "@/components/SideBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { brands } from "@/constants";
import dots from "dots";

const AllArticles = () => {
  const router = useRouter();
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleted, setDeleted] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [filterValues, setFilterValues] = useState({
    sort: "",
    publisher: "",
    brand: "",
    quantity: "",
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const { search } = searchValues;
  const { sort, publisher, brand, quantity } = filterValues;

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const initialSet = () => {
    setAllData(data);
  };

  const handleDelete = async (id) => {
    let token;

    if (getCookie("token_user")) {
      token = getCookie("token_user");
      let clicked = confirm(`You are about to delete ${id} `);

      if (clicked) {
        await deleteArticle(id, token)
          .then((data) => {
            // console.log(data);
            setAlert({
              ...alert,
              loading: false,
              message: "Product deleted successfully..",
              error: false,
              success: true,
            });
            setDeleted(!deleted);
            // resetAlert()
          })
          .catch((err) => {
            console.log(err);
            setAlert({
              ...alert,
              loading: false,
              message: "There was a error deleting Product...",
              error: false,
              success: true,
            });
          });
      }

      //   }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };
  const handleSearch = (name) => (e) => {
    e.preventDefault();
    setSearchValues({ ...searchValues, [name]: e.target.value });
  };

  const resetFilter = () => {
    setFilterValues({ sort: "", publisher: "", status: "" });
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
    // console.log("page changed...", page);

    handleSubmit();
    // console.log(allData);
  }, [page, filterValues, deleted]);

  useEffect(() => {
    handleSearchSubmit();
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
            // console.log(data.totalCount);
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

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    let params;
    setAlert({ ...alert, loading: true });

    params = {
      limit,
      page,
    };

    if (filterValues?.sort) {
      params.sort = filterValues.sort;
    }
    if (filterValues?.publisher) {
      params.publisher = filterValues.publisher;
    }
    if (filterValues?.brand) {
      params.brand = filterValues.brand;
    }
    if (filterValues?.quantity) {
      params.quantity = filterValues.quantity;
    }
    // if (searchValues?.search) {
    //   params.orderId = searchValues.search;
    // }
    let token = getCookie("token_user");

    await allArticles(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setAllData(data.doc);
          console.log(data.totalCount);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));
          setShow(false);

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
  console.log(allData, "is there data...");

  const goTo = (link) => {
    router.push(link);
  };

  return (
    <>
      <SideBar>
        <section className="items-center lg:flex bg-gray-50 lg:h-full mt-12 font-poppins dark:bg-gray-800 ">
          {alert && alert?.message && (
            <Modal alert={alert} setAlert={resetAlert} />
          )}
          <div className="justify-center flex-1 max-w-6xl px-4 mx-auto  md:px-6">
            <div className="overflow-x-auto bg-white rounded shadow dark:bg-gray-900">
              <div className="">
                <h2 className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300 dark:border-gray-700 dark:text-gray-400">
                  All Articles
                </h2>
                <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b dark:border-gray-700">
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
                        onChange={handleSearch("search")}
                      />
                      {/* <div
                        className="absolute flex right-0 top-0 mr-5 items-center ml-2 h-full "
                        onClick={handleSubmit}
                      >
                        <svg
                          className="w-4 h-4 fill-current text-primary-gray-dark"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                        </svg>
                      </div> */}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">Filters</p>

                      <button
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                        onClick={() => resetFilter()}
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
                          onChange={handleChange("sort")}
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
                          value={publisher}
                          onChange={handleChange("publisher")}
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
                  </div>
                </div>
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200 dark:border-gray-800">
                        {/* <input className="mr-4" type="checkbox" name="" id="" /> */}
                      {/* <th className="flex items-center py-3 pl-6 font-medium dark:text-gray-400">
                        <span>No.</span>
                      </th> */}
                      <th className="px-6 py-3 font-medium dark:text-gray-400">
                        Article Title
                      </th>
                      <th className="px-6 py-3 font-medium dark:text-gray-400">
                        Created At
                      </th>
                      <th className="px-6 py-3 font-medium dark:text-gray-400">
                        Publisher
                      </th>
                      {/* <th className="px-6 py-3 font-medium dark:text-gray-400">
                        publisher
                      </th> */}
                      <th className="px-6 py-3 font-medium dark:text-gray-400">
                        Update
                      </th>
                      <th className="px-6 py-3 font-medium dark:text-gray-400">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData &&
                      allData?.map((product, index) => {
                        return (
                          <tr
                            className="border-b border-gray-200 dark:border-gray-800"
                            key={index}
                          >
                              {/* <input className="mr-4" type="checkbox" name="" id="" /> */}
                            {/* <td className="flex items-center px-6 py-3 text-sm font-medium">
                              <p className="dark:text-gray-400">
                                {product._id}
                              </p>
                            </td> */}
                            <td className="px-6 text-sm font-medium dark:text-gray-400">
                              {dots(product.title,50)}
                              {/* {`${product?.model}  ${product?.processor} ${product?.ram} ${product?.storage} laptop`} */}
                            </td>
                            <td className="px-6 text-sm font-medium dark:text-gray-400">
                              {product.createdAt.split("T")[0]}
                            </td>
                            <td className="px-6 text-sm font-medium dark:text-gray-400">
                              {product?.publisher}
                            </td>
                            {/* <td className="px-6 text-sm font-medium dark:text-gray-400">
                              <span className="inline-block px-2 py-1 text-gray-700 dark:text-gray-400">
                                {product.author}
                              </span>
                            </td> */}
                            <td className="px-6 text-sm">
                              <div
                                // href={`/articles/updateArticle?articleId=${product._id}`}
                                onClick={()=> goTo(`/articles/updateArticle?articleId=${product._id}`)}
                                className="inline-block px-2 py-1 text-green-700 bg-green-100 rounded-md dark:bg-gray-800 dark:text-gray-400"
                              >
                                Update
                              </div>
                            </td>
                            <td className="px-6 text-sm font-medium dark:text-gray-400">
                              <span
                                className="inline-block px-2 py-1 text-red-700 bg-red-100 rounded-md dark:bg-gray-800 dark:text-gray-400 cursor-pointer"
                                onClick={() => handleDelete(product._id)}
                              >
                                Delete
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="flex flex-wrap items-center justify-between px-6 py-3">
                  <p className="mb-4 text-xs lg:mb-0 dark:text-gray-400">
                    Showing 1 to 10 of 13 entries
                  </p>
                  <nav aria-label="page-navigation ">
                    <ul className="flex mb-4 list-style-none lg:mb-0">
                      <li className="page-item  ">
                        <a
                          href="#"
                          className="relative block px-3 py-1 mr-1 text-xs text-gray-700 transition-all duration-300 rounded-md  dark:text-gray-400  hover:bg-blue-100"
                          onClick={prevPage}
                        >
                          Previous
                        </a>
                      </li>
                      {[...Array(totalPages)].map((val, index) => {
                        return (
                          <li
                            key={index}
                            className="page-item "
                            onClick={() => setPage(index + 1)}
                          >
                            <a
                              href="#"
                              className="relative block px-3 py-1 mr-1 text-xs text-gray-100 transition-all duration-300 bg-blue-600 rounded-md hover:text-blue-700 hover:bg-blue-200 dark:hover:text-gray-400 dark:hover:bg-gray-700"
                            >
                              {index + 1}
                            </a>
                          </li>
                        );
                      })}

                      <li className="page-item ">
                        <a
                          href="#"
                          className="relative block px-3 py-1 text-xs text-gray-700 transition-all duration-300 rounded-md dark:text-gray-400 dark:hover:bg-gray-700 hover:bg-blue-100 "
                          onClick={nextPage}
                        >
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SideBar>
    </>
  );
};

export default AllArticles;