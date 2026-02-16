import { Account, Databases, ID } from "appwrite";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../appwrite/appwrite";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../utils/firebase";
import SnackBar from "../SnackBar";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const [snackMessage, setSnackMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const auth = getAuth(app);
  const db = getFirestore(app);

  // const account = new Account(client)

  const handleClick = (e) => {
    // Register User
    // const databases = new Databases(client)
    // const name = firstName + " "+lastName
    // account.create(
    //         ID.unique(),
    //         email,
    //         password,
    //         name,
    //     ).then(async response => {
    //       await databases.createDocument("63ea71bf868ae0af7718","63ea71c5aa835458fd6b",ID.unique(),{
    //         FirstName:firstName,
    //         LastName:lastName,
    //         Email:email,
    //         UID:response.$id
    //       })
    //     }, error => {
    //         console.log(error);
    //     });

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await addDoc(collection(db, "Users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          UID: user.uid,
        });
        setUser(user);
        setIsSignedUp(true);
        // store uid so Layout/NavBar pick up auth state
        localStorage.setItem("UID", user.uid);
        // set global snack and notify listeners, then navigate immediately
        localStorage.setItem("snackMessage", "Signup successfully");
        window.dispatchEvent(new Event("auth-change"));
        window.dispatchEvent(new Event("snack-change"));
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setIsSignedUp(false);
        setSnackMessage("User Already Exists  ");
        setTimeout(() => {
          setSnackMessage("");
        }, 3000);
        // ..
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#212121]">
      <div className="flex flex-col w-100 h-100 border border-gray-500 p-20 items-center rounded-3xl">
        <h2 className="font-bold text-2xl mb-5 text-white">Signup</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className=" p-3 w-40 m-3 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 w-40 m-3 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          />
        </div>
        <input
          className="p-5 m-5 w-4/5 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          placeholder="Email"
          type={"text"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-5 m-5 w-4/5 h-10 rounded-full border  text-white bg-[#363636] border-gray-400 focus:border-white focus:outline-none"
          placeholder="Password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="text-white m-5 text-center rounded-full w-40 h-10 active:bg-red-600 bg-red-500"
          onClick={handleClick}
        >
          Signup
        </button>
        <div className="flex pt-5">
          <h3 className="text-white pr-3">Already Have Account</h3>
          <Link
            to="/login"
            className="text-semibold  text-white visited:text-red-400 active:text-red-500"
          >
            Login
          </Link>
        </div>
      </div>
      {snackMessage && <SnackBar message={snackMessage} />}
    </div>
  );
};

export default Signup;
