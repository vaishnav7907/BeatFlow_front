import React, { useEffect, useState } from "react";
import MainDashboard from "../dashboard/MainDashboard";
import WelcomeInterface from "./WelcomeInterface";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import "../authentication/Signup.css";

const Signup = ({ tosignup }) => {
  // const navigate=useNavigate()
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");

  const onchangeemail = (e) => {
    setEmail(e.target.value);
  };

  const onchangepassword = (e) => {
    setPassword(e.target.value);
  };

  const submitt = async (prev) => {
    prev.preventDefault();
    console.log(Email, Password);
    tosignup();

    try {
      const response = await axios.post(
        "http://localhost:5999/authentication/signup",
        { Email, Password },
      );
      console.log(response);
    } catch (error) {
      console.log("this:", error);
    }

    // navigate("/signup")
  };

  return (
    <div>
      <div className="h-70 w-120 bg-white/2 backdrop-blur-[.2em] border border-white/2 rounded-xl shadow-lg  flex justify-center items-center">
        <form onSubmit={submitt} className="flex flex-col gap-5 items-center">
          <div>
            <h3 className="font-medium text-2xl  text-fuchsia-50">SignUp</h3>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-fuchsia-50">
              Enter Email Address
            </label>
            <input
              type="email"
              className="w-70  h-7  bg-white/2  border-white/0  rounded-[.5em] p-3 text-[#E9854F] placeholder-gray-500 "
              placeholder="email . . ."
              value={Email}
              onChange={onchangeemail}
            />

            <label htmlFor="" className="text-fuchsia-50 ">
              Enter Password
            </label>
            <input
              type="password"
              className="w-70  h-7  bg-white/2  border-white/0  rounded-[.5em] p-3 text-[#E9854F] placeholder-gray-500"
              placeholder="password . . ."
              value={Password}
              onChange={onchangepassword}
            />
          </div>
          <div>
            <button
              className="w-30 h-9 rounded-2xl  bg-[#E9854F] hover:bg-amber-600 text-gray-950"
              type="submit"
            >
              Let's Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
