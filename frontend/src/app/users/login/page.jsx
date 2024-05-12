"use client";

import { logIn } from "@/actions/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authenticate } from "@/actions/auth";
import Modal from "@/components/Modal";

const Login = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const [tempError, setTempError] = useState(false);
  useEffect(() => {
    // if (getCookie("token_user")) {
    //   Router.push(`/`);
    // }
  }, []);

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !values.email ||
      values.email.length <= 0 ||
      !values.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setTempError(true);
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provid a valid email..",
      });
      return;
    }
    if (!values.password || values.password.length <= 0) {
      setTempError(true);
      setValues({
        ...values,
        loading: false,
        error: true,
        message: "Please provide a valid password..",
      });
      return;
    }
    // setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: false, error: true, message: "Loading.." });
    const user = { email, password };

    await logIn(user)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          setTempError(false);
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);

          // console.log(data);
          // console.log(data.error);
          authenticate(data.data, "user", () => {
            if (localStorage.getItem("user")) {
              router.push(`/`);
            }
          });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: "Check Your credentials...",
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: "check your credentials...",
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  return (
    <>
      {/* {alert.error && (
        <Message
          message={alert.message}
          // alert={"error"}
          resetAlert={resetAlert}
        />
      )}
      {alert.success && (
        <Message
          message={alert.message}
          // alert={"success"}
          resetAlert={resetAlert}
        />
      )}
      {alert.loading && (
        <Message
          message={"Loading...Please Waite..."}
          // alert={"loading"}
          resetAlert={resetAlert}
        />
      )} */}
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        {alert && alert?.message && (
          <Modal alert={alert} setAlert={resetAlert} />
        )}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Login to NewsCrape.Ai</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={handleChange("email")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Email address"
                    />
                    <label
                      for="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autocomplete="off"
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      placeholder="Password"
                    />
                    <label
                      for="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                  <div>
                    <span>Don't have an Account ?</span>
                    <Link
                      href={"/users/signup"}
                      className="bg-gray-200 rounded-xl p-2 hover:bg-gray-400 hover:text-white"
                    >
                      SignUp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;