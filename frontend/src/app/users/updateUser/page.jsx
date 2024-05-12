"use client";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie } from "@/actions/auth";
import { getProfile, oneUser, updateProfile, updateUser, updateUserPassword } from "@/actions/user";
// import Message from "@/components/Message";
import { useSearchParams } from "next/navigation";
import SideBar from "@/components/SideBar";
import Modal from "@/components/Modal";
import { oneArticle, updateArticle } from "@/actions/article";

const UpdateUser = () => {
    const searchParams = useSearchParams();
    const [paramsData, setParamsData] = useState({
        userId: searchParams.get("userId"),
  
      });
  const [values, setValues] = useState(
    {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        role: "",
        images: ""
      }
      
      
  );


  const [userId, setuserId] = useState();

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
    username,firstName,lastName,email,role,images
  } = values;
//   useEffect(()=>{
// setuserId(searchParams.get(userId))
// // console.log(searchParams.getAll())
// initialProfileData()
//   },[searchParams.get(userId)])

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
    // let userId = searchParams.get(userId)

    // setuserId(userId)

    console.log("called...")
    let token = getCookie("token_user");

    if(paramsData.userId){await getProfile(paramsData.userId,token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          setValues({
          
                username: data.doc.username,
                firstName: data.doc.firstName,
                lastName: data.doc.lastName,
                email: data.doc.email,
            
                role: data.doc.role,
                images: data.doc.images
       
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
    console.log(token)

    let data = {
    //   username,
    //   email,
    //   country,
    //   streetAddress,
    //   city,
    username,firstName,lastName,email,role,images

    };

    // let formData = new FormData()

    // for (const key in data) {
    //   formData.append(key, data[key]);
    // //   setValues({ ...values, formData });
    //   // console.log(`${key}: ${phone[key]}`);
    // }

    // console.log(paramsData.userIdId, "from update submit");

    await updateUser(paramsData.userId, data, token)
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
              Update User
            </h2>
            <form action="#">
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">

                <div className="sm:col-span-2">
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={handleChange("username")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update title"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="firstname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    FirstName
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstName}
                    onChange={handleChange("firstName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update Firstname"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="lastname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    LastName
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastName}
                    onChange={handleChange("lastName")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update lastname"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update email"
                    required=""
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    value={role}
                    onChange={handleChange("role")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Update role"
                    required=""
                  />
                </div>

              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900 hover:bg-gray-800"
              >
                Update User
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

export default UpdateUser;