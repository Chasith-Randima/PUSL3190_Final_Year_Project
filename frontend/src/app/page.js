"use client";
import { allArticles,searchArticles } from "@/actions/article";
import { useState, useEffect } from "react";
import { getCookie } from "@/actions/auth";
import Modal from "@/components/Modal";
// import SearchProduct from "@/components/SearchProduct";

import ProductCard from "@/components/ProductCard";
import { brands } from "@/constants";
import { basicScrape,scrapeOne } from "@/actions/scrape";
import { newBasicScrape,newScrapeOne } from "@/actions/newScrape";
import ProductDetailsCard from "@/components/ProductDetailsCard";
// import ShowMore from "@/components/ShowMore";
// import SearchBar from "@/components/Searchbar";
// import CustomFilter from "@/components/CustomFilter";
// import Hero from "@/components/Hero";

export default function Home({ searchParams }) {
  // const allCars = await fetchCars({
  //   manufacturer: searchParams.manufacturer || "",
  //   year: searchParams.year || 2022,
  //   fuel: searchParams.fuel || "",
  //   limit: searchParams.limit || 10,
  //   model: searchParams.model || "",
  // });

  const [filterValues, setFilterValues] = useState({
    category: "",
    brand: "",
    price: "",
    sort: "",
    publisher:""
  });

  const [searchValues, setSearchValues] = useState({
    search: "",
  });

  const { search } = searchValues;

  const { category, brand, price, sort ,publisher} = filterValues;

  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchClean, setSearchClean] = useState(false);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [view,setView] = useState("quickView")
  const [user,setUser] = useState()

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);
  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const initialSet = () => {
    setAllData(data);
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilterValues({ ...filterValues, [name]: e.target.value });
  };

  const handleSearch = (name) => (e) => {
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

    handleSubmit();
    // console.log(allData);
  }, [page, filterValues]);

  const resetFilter = () => {
    setFilterValues({ category: "", brand: "", price: "", sort: "",publisher:"" });
    setView("quickView")
    setSearchValues({search:""})
  };

  const handleSubmit = async (e) => {
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
    if (filterValues?.publisher) {
      params.publisher = filterValues.publisher;
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
  // console.log(allData, "is there data...");

  return (
    <main className="overflow-hidden">
      {/* <Hero /> */}

      {alert && alert?.message && <Modal alert={alert} setAlert={resetAlert} />}
      <div className=" padding-x padding-y max-width mt-4" id="discover">
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
                onChange={handleSearch("search")}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Filters</p>

              <button
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                onClick={() => resetFilter()}
              >
                Reset Filter
              </button>
            </div>

            <div>
                      <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-3  gap-4 mt-4">
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
                        <select
                          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                          value={view}
                          onChange={(e)=>setView(e.target.value)}
                        >
                          <option value="quickView">Default View</option>
                          <option value="quickView">Quick View</option>
                          <option value="detailedView">Detailed View</option>
                   
                        </select>
                      </div>
                    </div>

            {/* <div>
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
        <div>
        {user && <div className="flex mt-5 justify-center text-center">
  <div >
          {/* <h2 className="text-bold text-2xl p-10 rounded text-white bg-gray-300 cursor-pointer" onClick={basicScrape}>BASIC SCRAPE</h2> */}
          <button type="button" onClick={basicScrape} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">Scrape All</button>
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"NewsFirst"})}>NewsFirst</h2> */}
          <button type="button" onClick={()=>scrapeOne({scrapeSite:"NewsFirst"})} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">NewsFirst</button>
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"AdaDerana"})}>AdaDerana</h2> */}
          <button type="button" onClick={()=>scrapeOne({scrapeSite:"AdaDerana"})} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">AdaDerana</button>
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"BBC"})}>BBC</h2> */}
          <button type="button" onClick={()=>scrapeOne({scrapeSite:"BBC"})} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">BBC</button>
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"TheSun"})}>TheSun</h2> */}
          <button type="button" onClick={()=>scrapeOne({scrapeSite:"TheSun"})}class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">TheSun</button>
       
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"HindustanTimes"})}>HindustanTimes</h2> */}
          <button type="button" onClick={()=>scrapeOne({scrapeSite:"HindustanTimes"})} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">HindustanTimes</button>
        
        </div>
        <div>
          {/* <h2 className="text-bold text-2xl p-4 m-1 rounded text-white bg-gray-300 cursor-pointer" onClick={()=>scrapeOne({scrapeSite:"Nikkei"})}>Nikkei</h2> */}
          <button type="button"  onClick={()=>scrapeOne({scrapeSite:"Nikkei"})} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2">Nikkei</button>
        
        </div>
   </div>}

        </div>
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
            {view && view == "quickView" ?    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allData?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div> :    <div className="grid 2xl:grid-cols-4 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
              {allData?.map((product) => (
                <ProductDetailsCard product={product} />
              ))}
            </div>}
            {/* <div className="home__cars-wrapper">
              {allData?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div> */}

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
    </main>
  );
}