"use client";
import { useState, useEffect, useContext } from "react";
import { getCookie } from "@/actions/auth";
import Image from "next/image";

import { NewsContext } from "@/context/show-context";

import { useSearchParams } from "next/navigation";
import { oneArticle } from "@/actions/article";
import Modal from "@/components/Modal";

// import ReviewModal from "@/components/ReviewModal";
// import RatingStats from "@/components/RatingStats";
// import { allReviews } from "@/actions/review";
import { allComments, createComment } from "@/actions/comment";
import YoutubeGrid from "@/components/YoutubeGrid";
import RedditGrid from "@/components/RedditGrid";
import Collapsible from "@/components/Collapsible";
import Link from "next/link";
// import { calculateAverageRating, isIdInProducts } from "@/util";


const SingleProduct = () => {
  // let socket = io("http://127.0.0.1:3000");

  const searchParams = useSearchParams();

  const [paramsData, setParamsData] = useState({
    articleId: searchParams.get("articleId"),
    userID: "",
  });
  const [imageIndex, setImageIndex] = useState(0);

  const [allData, setAllData] = useState();
  const [allReview, setAllReview] = useState();
  const [userCount, setUserCount] = useState({});
  const [check, setCheck] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [values,setValues] = useState({
    comment:""
  })

  const {newsArticles,addToReadLater,isArticleInContext,removeEntireItem} = useContext(NewsContext)

  const [showReviewModel, setShowReviewModel] = useState(false);


  // let userCount;

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });



  //product State
  const [article, setArticle] = useState(paramsData.articleId);
  const [allOrdered, setAllOrdered] = useState();

  // Messages States
  // const [message, setMessage] = useState(1);
  const [realTimeUserCount, setRealTimeUserCount] = useState(0);


  const {comment} = values;

  // -------------context ------------

  console.log(newsArticles,"====================================================")


  // ---------------SOCKET CHAT -------------------

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  useEffect(() => {
    fetchData();

    fetchComments()

    if (localStorage.getItem("user")) {
      setParamsData({...paramsData,userID:JSON.parse(localStorage.getItem("user"))._id});
    }
    
  }, [refresh]);



  const fetchData = async () => {
    // let id = router.query.locationId;
    console.log(searchParams.get("medium"));
    let params = {
      medium: paramsData.medium,
      year: paramsData.year,
      subject: paramsData.subject,
      examType: paramsData.examType,
    };

    // console.log(id);
    await oneArticle(paramsData.articleId)
      .then((data) => {
        console.log(data, "fetched.........................");
        if (data.status && data.status == "success") {
          // if (data.results == 0) {
          //   setAlert({
          //     ...alert,
          //     loading: false,
          //     message: data.message,
          //     error: false,
          //     success: true,
          //   });

          //   window.setTimeout(() => {
          //     resetAlert();
          //   }, 1000);
          // } else {
          setAllData(data.doc);
          console.log(data.doc, "inside else");
          setItemCount(cartItems[allData._id]?.count);
          // console.log(data.totalCount);
          // let totalCount = data.totalCount;
          // setTotalPages(Math.ceil(totalCount / limit));
          // setShow(false);
          // }
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
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: "Loading...",
          error: true,
          success: false,
        });
      });
  };


  const fetchComments = async () => {
    let data = {
      articleId: paramsData.articleId,
    };

    // console.log(id);
    await allComments(data)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllReview(data.doc);

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
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
      });
  };

  const handleComment = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };


  const handleCommentSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    // e.preventDefault();
    setAlert({ ...alert,message:"Loading...", loading: true });
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
    user:paramsData.userID,
    article:paramsData.articleId,
     comment
    };

    console.log(data)

    // for (const key in data) {
    //   formData.append(key, data[key]);
    //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    // console.log(userId, "from update submit");

    await createComment(data)
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
            // resetFilter()
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
        // resetFilter()
      });
  };
  return (
    <>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        {alert && alert?.message && (
          <Modal alert={alert} setAlert={resetAlert} />
        )}
        {showReviewModel && (
          <ReviewModal
            setShowReview={setShowReviewModel}
            articleId={paramsData?.articleId}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        )}
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">


          <div class="container my-12 mx-auto md:px-6">
  {/* <!-- Section: Design Block --> */}

  <section class="mb-8">
   {/* {allData && isArticleInContext(allData._id) ?<button className="bg-blue-400 p-5" onClick={()=>removeEntireItem(allData._id)}>remove from read later</button> :<button className="bg-blue-400 p-5" onClick={()=>addToReadLater(allData._id, allData.publisher, allData.title, allData.image)}>add to read later</button>
    } */}
    <img
              src={allData && allData?.image ? allData.image : "/png/logo-color.png"}
    //  src="https://mdbcdn.b-cdn.net/img/new/slides/198.jpg"
      class="mb-6 w-3/5 rounded-lg shadow-lg dark:shadow-black/20 mx-auto  border border-black p-4" alt="image" />

    <div class="mb-6 flex items-center">
      <img 

      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (23).jpg"
      
      class="mr-2 h-8 rounded-full" alt="avatar"
        loading="lazy" />
      <div className="grid grid-cols-4 w-full">
        {allData && allData?.date && <span> Published <u>{allData.date}</u> by </span>}
       {allData && allData?.author ? <a href="#!" class="font-medium">{allData.author}</a> : <p> Unknown</p>}
       <div className="col-span-2 ml-auto justify-left"> 
       {allData && allData?.publisher &&
        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize">
{allData.publisher}

</button>

       }
            {newsArticles && isArticleInContext(paramsData.articleId) ? <button
     onClick={()=>removeEntireItem(paramsData.articleId)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Remove From Read Later</button> : <button
                  
                  onClick={()=>addToReadLater(paramsData.articleId, allData.publisher, allData.title, allData.image)}
                  class="p-1 transition text-sm ml-8 ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none">Add
            to Read Later</button>}
  
       </div>
       {/* {allData && allData?.publisher &&
        <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 capitalize">
{allData.publisher}


</button>

       } */}
    
      </div>
    </div>

    {allData && allData?.title && <h1 class="mb-6 text-3xl font-bold">
      {allData.title}
    </h1>}

    {allData && allData?.summarized_text && <p>
      {allData.summarized_text}
    </p>}
  </section>
  {/* <!-- Section: Design Block --> */}
{/* <!-- Container for demo purpose --> */}
{allData && allData?.url && <div>
  <h2 className="text-gray-400">Original Article Link : <span><Link href={allData.url}>{allData.url}</Link></span></h2>
</div>}
</div>

        
          </div>
          <section>
          <div className="container mx-auto mt-4">
      {allData && allData.original_text && <Collapsible title="Click to See original Article">
        <p>{allData.original_text}</p>
      </Collapsible>}
    </div>
          </section>

          {/* ----------------youtube grid--------------- */}
          <div className="bg-white dark:bg-gray-900">
            <div className=" px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-4">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Related Youtube Videos
                </h2>
              </div>
         

{allData && <YoutubeGrid title={allData.title}/>}
</div>
</div>
          {/* ----------------youtube grid--------------- */}
          {/* ----------------reddit grid--------------- */}
          <div className="bg-white dark:bg-gray-900">
            <div className="py-2 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-4">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Related Reddit Posts
                </h2>
              </div>
         

{allData && <RedditGrid title={allData.title}/>}
</div>
</div>
          {/* ----------------reddit grid--------------- */}


{/* comments */}

<div className="w-full px-4 md:w-1/2 ">
              
              {/* <!-- Reviews --> */}
              {/* <div class="my-10 mx-auto max-w-screen-md px-10 py-16">
                <div class="flex w-full flex-col">
                  <div class="flex flex-col sm:flex-row">
                    <h1 class="max-w-sm text-3xl font-bold text-blue-900">
                      What people think <br />
                      about this product
                    </h1>
                    <div class="my-4 rounded-xl bg-white py-2 px-4 shadow sm:my-0 sm:ml-auto">
                      {allReview && (
                        <div class="flex h-16 items-center text-2xl font-bold text-blue-900">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-12 w-12 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                         
                        </div>
                      )}
                      <p class="text-sm text-gray-500">Average User Rating</p>
                    </div>
                  </div>
                  {allReview && allOrdered && (
                    <RatingStats
                      data={allReview}
                      setShowReviewModel={setShowReviewModel}
                      isIdInProducts={isIdInProducts}
                      allOrdered={allOrdered}
                      userID={paramsData.userID}
                      articleID={paramsData.articleId}
                    />
                  )}
                </div>
              </div> */}

              {/* <!-- /Reviews --> */}
            </div>
{/* comments */}
          {/* reviews */}
          <div className="bg-white dark:bg-gray-900">
            <div className="py-2 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
              <div className="max-w-screen-md mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Comments
                </h2>
              </div>

             {paramsData && paramsData?.userID && <div>
              <div className="relative">
              {/* <div className=""> */}
              <div className="absolute flex items-center ml-2 h-full">
              {/* <div className=" flex items-center ml-2 h-full"> */}
                <svg
                  className="w-4 h-4 fill-current text-primary-gray-dark"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                </svg>
              </div>

<div className="flex  border border-gray-500 border-5 px-5 py-5 rounded-lg ">

              <input
                type="text"
                placeholder="Search Product name"
                className="px-8 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                value={comment}
                onChange={handleComment("comment")}
              />
              <input type="button" value="Comment" onClick={handleCommentSubmit} className="bg-blue py-auto px-10 bg-gray-200 rounded-lg ml-5 hover:bg-blue-300 hover:text-white cursor-pointer" />
</div>
            </div>
              </div>}

              {allReview ? (
                <div className="space-y-8  md:space-y-0">
                  <ul class="">
                    {allReview.map((review, index) => {
                      let goldStars = Number(review.ratings);
                      let darskStars = 5 - goldStars || 0;

                      console.log(
                        goldStars,
                        darskStars,
                        "Stars...................."
                      );
                      return (
                        <li class="py-4 text-left border px-4 m-2" key={index}>
                          <div class="flex items-start">
                            <div>
                              <img
                                className="h-8 w-8 rounded-full text-white"
                                fill
                                src={"/svg/user-avatar.svg"}
                                alt=""
                              />
                            </div>
                            <div class="ml-6">
                              {/* <div class="flex items-center">
                                {[...Array(Number(goldStars))].map(
                                  (val, index) => {
                                    return (
                                      <svg
                                        index={index}
                                        class="block h-6 w-6 align-middle text-yellow-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                          class=""
                                        ></path>
                                      </svg>
                                    );
                                  }
                                )}
                                {darskStars &&
                                  darskStars > 0 &&
                                  [...Array(darskStars)].map((val, index) => {
                                    return (
                                      <svg
                                        key={index}
                                        class="block h-6 w-6 align-middle text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                          class=""
                                        ></path>
                                      </svg>
                                    );
                                  })}
                              </div> */}
                              <p class="mt-2 text-base text-gray-900">
                                {review.comment}
                              </p>
                              <p class="mt-2 text-sm font-bold text-gray-900">
                                {review?.user[0]?.username ? review?.user[0]?.username : "Unknown"}
                              </p>
                              <p class="mt-1 text-sm text-gray-600">
                                {review.createdAt.split("T")[0]}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <div className="home__error-container">
                  <h2 className="text-black text-xl font-bold">
                    No Comments for this Article yet
                  </h2>
                </div>
              )}
              {allReview && allReview.length <= 0 && (
                <div className="home__error-container">
                  <h2 className="text-black text-xl font-bold">
                    No Comments for this Article yet
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;