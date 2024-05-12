"use client";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie } from "@/actions/auth";
import { getProfile, updateProfile, updateUserPassword } from "@/actions/user";
// import Message from "@/components/Message";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import { oneArticle, updateArticle } from "@/actions/article";

const UpdateArticle = () => {
    const searchParams = useSearchParams();
    const [paramsData, setParamsData] = useState({
        articleId: searchParams.get("articleId"),
  
      });
  const [values, setValues] = useState(
    // username: "",
    // email: "",
    // country: "",
    // streetAddress: "",
    // city: "",
    // region: "",
    // postalCode: "",
    // description: "",
    // formData: "",
    {
        author: "",
        comments: [],
        createdAt: "",
        customFetch: "",
        date: "",
        image: "",
        images: [],
        original_text: "",
        publisher: "",
        summarized_text: "",
        time: "",
        title: "",
        url: "",
        user: [],
        _id: ""
      }
      
  );


  const [articleId, setArticleId] = useState();

  const [refresh, setRefresh] = useState(false);

  const [authValues, setAuthValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
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

  const {
    author,date,original_text,publisher,summarized_text,time,title,url,image,

    formData,
  } = values;
//   useEffect(()=>{
// setArticleId(searchParams.get(articleId))
// // console.log(searchParams.getAll())
// initialProfileData()
//   },[searchParams.get(articleId)])

  useEffect(() => {
    setAlert({ ...alert, loading: true });

    initialProfileData();
  }, [refresh]);

  const initialProfileData = async () => {
    // let token = getCookie("token_user");
    // console.log(searchParams.get("userid"));
    // let userIdTemp = searchParams.get("userId");
    // let userIdTemp;
    // if (localStorage.getItem("user")) {
    //   userIdTemp = JSON.parse(localStorage.getItem("user"))._id;
    // }
    // console.log(userIdTemp);
    // setUserId(userIdTemp);
    // let articleId = searchParams.get(articleId)

    // setArticleId(articleId)

    console.log("called...")

    if(paramsData.articleId){await oneArticle(paramsData.articleId)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
            // ...values,
            // ...data.doc,

            author: data.doc.author,
            date: data.doc.date,
            original_text: data.doc.original_text,
            publisher: data.doc.publisher,
            summarized_text: data.doc.summarized_text,
            time: data.doc.time,
            title: data.doc.title,
            url: data.doc.url,
            image: data.doc.image

            // username: data.doc.username,
            // email: data.doc.email,
            // formData: new FormData(),
            // images: data.doc.images,
            // country: data.doc.country,
            // streetAddress: data.doc.streetAddress,
            // city: data.doc.city,
            // region: data.doc.region,
            // postalCode: data.doc.postalCode,
            // description: data.doc.description,
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
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });}
  };

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
    e.preventDefault();
    setAlert({ ...alert, loading: true });
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
    author,
    date,
    original_text,
    publisher,
    summarized_text,
    time,
    title,
    url,
    image
    };

    // for (const key in data) {
    //   formData.append(key, data[key]);
    //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    console.log(paramsData.articleIdId, "from update submit");

    await updateArticle(paramsData.articleId, data, token)
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
      });
  };

  // update password

  const { currentPassword, password, confirmPassword } = authValues;

  const handleAuthChange = (name) => (e) => {
    e.preventDefault();
    setAuthValues({ ...authValues, [name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });

    let token = getCookie("token_user");

    let data = {
      passwordCurrent: currentPassword,
      password,
      passwordConfirm: confirmPassword,
    };

    await updateUserPassword(userId, data, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAuthValues({
            ...authValues,
            confirmPassword: "",
            currentPassword: "",
            password: "",
          });
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
          }, 1000);
          // routerNew.reload();
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
  return (
    <>
      <SideBar>
        <section className="bg-white dark:bg-gray-900">
          {alert && alert?.message && (
            <Modal alert={alert} setAlert={resetAlert} />
          )}
          <div className="py-8 px-4 mx-auto max-w-2xl lg:pt-16 lg:pb-4">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update Article
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                <div className="sm:col-span-2">
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={handleChange("title")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update title"
                    required=""
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    for="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Url
                  </label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    value={url}
                    onChange={handleChange("url")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update url"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={image}
                    onChange={handleChange("image")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Image Url"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    value={date}
                    onChange={handleChange("date")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Date"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="time"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    id="time"
                    value={time}
                    onChange={handleChange("time")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Time"
                    required=""
                  />
                </div>
      
                <div className="sm:col-span-2">
                  <label
                    for="author"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    onChange={handleChange("author")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Author"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="publisher"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    id="publisher"
                    value={publisher}
                    onChange={handleChange("publisher")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Publisher"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="summarized_text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Summarized Text
                  </label>
                  <input
                    type="text"
                    name="summarized_text"
                    id="summarized_text"
                    value={summarized_text}
                    onChange={handleChange("summarized_text")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Summarized Text"
                    required=""
                  />
                </div>
      
                <div className="sm:col-span-2">
                  <label
                    for="original_text"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Original Text
                  </label>
                  <input
                    type="text"
                    name="original_text"
                    id="original_text"
                    value={original_text}
                    onChange={handleChange("original_text")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Original Text"
                    required=""
                  />
                </div>
      
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Update Article
              </button>
            </form>
          </div>
        </section>
        <hr />
        {/* <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              Update Password
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    for="currentPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={handleAuthChange("currentPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Current Password"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleAuthChange("password")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Password"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleAuthChange("confirmPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Confirm Pssword"
                    required=""
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleAuthSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Update Password
              </button>
            </form>
          </div>
        </section> */}
      </SideBar>
    </>
  );
};

export default UpdateArticle;