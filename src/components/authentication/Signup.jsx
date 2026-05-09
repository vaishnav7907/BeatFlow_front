import axios from "axios";
import React, { useState } from "react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const Signup = ({setIslogin }) => {
  const navigation = useNavigate();
  const [sign, setSign] = useState(true);
  const [Fullname, setFullname] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onchnagefullname = (e) => {
    setFullname(e.target.value);
  };
  const onchangeemail = (e) => {
    setEmail(e.target.value);
  };

  const onchangepassword = (e) => {
    setPassword(e.target.value);
  };

  const submitt = async (e) => {
    e.preventDefault();

    try {
      if (!sign) {
        // SIGNUP
        await axios.post(`${import.meta.env.VITE_API_URL}/Beatflow/signup`, { 
          Fullname,
          Email,
          Password,
        });
        alert("Signup success ✅");
       setSign(true)
      } else {
        // LOGIN
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/Beatflow/login`,
          { Email, Password },
        );

        localStorage.setItem("token", res.data.token);
        setIslogin(true); // ✅ VERY IMPORTANT
        navigation("/dashboard");
      }
    } catch (error) {
      const msg = error.response?.data?.message;

      if (error.response?.status === 409) {
        alert("Email already exists ❌");
      } else if (msg) {
        alert(msg); // ✅ shows real error (invalid email/password)
      }
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center bg-linear-to-b from-black via-[#020617] to-black">
      {/* AUTH CARD WRAPPER */}
      <div className="w-105 ">
        {/* OUTER GLOW */}
        <div className=" rounded-2xl blur-md opacity-60"></div>

        {/* MAIN CARD */}
        <div className="relative bg-[#0b0f1a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6">
          {/* TOGGLE BUTTONS */}
          <div className="flex justify-between bg-white/5 rounded-lg p-1 mb-6">
            <button
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                sign
                  ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-400"
              }`}
              onClick={() => setSign(true)}
            >
              Sign In
            </button>

            <button
              className={`w-1/2 py-2 rounded-md font-medium transition ${
                !sign
                  ? "bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "text-gray-400"
              }`}
              onClick={() => setSign(false)}
            >
              Sign Up
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={submitt}>
            {!sign ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 transition"
                  value={Fullname}
                  onChange={onchnagefullname}
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
                  value={Email}
                  onChange={onchangeemail}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 transition"
                  value={Password}
                  onChange={onchangepassword}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40 transition"
                  value={Email}
                  onChange={onchangeemail}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
                  value={Password}
                  onChange={onchangepassword}
                />
              </div>
            )}
            <div className="mt-6 flex justify-between items-center">
              <LiaSignOutAltSolid
                size={26}
                className="text-gray-400 hover:text-red-500 hover:scale-110 transition cursor-pointer"
                onClick={() => navigation("/")}
              />

              <button
                className="px-6 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition"
                type="submit"
              >
                {sign ? "Login" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
