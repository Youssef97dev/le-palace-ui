"use client";
import { userAppStore } from "@/store/store";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";
import Link from "next/link";
import { login } from "@/lib/auth";

// Icons
import { IoMdClose } from "react-icons/io";

// Style
import "../../../styles/tailwind.css";

const Signin = () => {
  const router = useRouter();
  const {
    setIsLoggedIn,
    isLoggedIn,
    setUserInfo,
    setLoadingData,
    setErrorMessage,
    loadingData,
    errorMessage,
  }: any = userAppStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isClient, setIsClient] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      setLoadingData(true);
      const data = await login(formData.username, formData.password);
      console.log("Page Signin: ", data);
      if (data?.response?.data?.error) {
        setErrorMessage(data.response.data.message);
        setLoadingData(false);
      } else {
        setUserInfo(data);
        setIsLoggedIn(true);
        router.push("/");
        setLoadingData(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="flex min-h-screen items-center justify-center bg-[url('/map.svg')] bg-cover bg-center">
      <div className="panel m-6 w-full max-w-lg sm:w-[480px]">
        {errorMessage !== "" && (
          <div className="flex items-center p-3.5 my-2 rounded text-[#e2a03f] bg-[#fff9ed]">
            <span className="pr-2">
              <strong className="mr-1">Warning!</strong>
              <span>{errorMessage}.</span>
            </span>
            <button
              onClick={() => setErrorMessage("")}
              type="button"
              className="ml-auto hover:opacity-80"
            >
              X
            </button>
          </div>
        )}
        <h2 className="mb-3 text-2xl font-bold">Sign In</h2>
        <p className="mb-7">Enter your username and password to login</p>
        <form className="space-y-5" onSubmit={(e) => handleLogin(e)}>
          <div>
            <label htmlFor="email">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-input"
              placeholder="Enter Username"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-input"
              placeholder="Enter Password"
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            {!loadingData ? `Sign In` : <BeatLoader color="#fff" size={10} />}
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Signin;
