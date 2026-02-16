import { Account } from "appwrite";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../appwrite/appwrite";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../utils/firebase";
import SnackBar from "../SnackBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleClick = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("UID", user.uid);
        // store UID and trigger global auth change
        localStorage.setItem("snackMessage", "Logged In Successfully");
        window.dispatchEvent(new Event("auth-change"));
        window.dispatchEvent(new Event("snack-change"));
        // navigate immediately to home
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/user-not-found") {
          setSnackMessage("Please sign up first");
        } else {
          setSnackMessage("User Already Exists");
        }
        setTimeout(() => {
          setSnackMessage("");
        }, 3000);
      });
    // account.createEmailSession(email,password).then((res) => {
    //     console.log(res);
    // })
    // .catch(err => console.log(err))
  };
  return (
    <div className="flex items-center justify-center h-screen bg-[#212121]">
      <div className="flex flex-col w-100 h-100 border border-gray-500 p-20 items-center rounded-3xl">
        <h2 className="font-bold text-2xl text-white">Login</h2>
        <input
          className="p-5 m-5 w-[20vw] h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          type={"text"}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-5 m-5 w-[20vw] h-10 rounded-full border  text-white bg-[#363636] border-gray-400 focus:border-white focus:outline-none"
          type={"password"}
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="text-white m-5 text-center rounded-full w-40 h-10 active:bg-red-600 bg-red-500"
          onClick={handleClick}
        >
          Login
        </button>
        <div className="flex pt-5">
          <h3 className="text-white pr-3">Don't Have Account</h3>
          <Link
            to="/signup"
            className="text-semibold  text-white visited:text-red-400 active:text-red-500"
          >
            SignUp
          </Link>
        </div>
      </div>
      {snackMessage && <SnackBar message={snackMessage} />}
    </div>
  );
};

export default Login;
