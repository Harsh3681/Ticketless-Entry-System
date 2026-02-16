import React, { useState } from "react";
import Account from "./Account";
import Orders from "./Orders";
import { getAuth, signOut } from "firebase/auth";
import app from "../../utils/firebase";
import { useNavigate } from "react-router";

function Profile() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [orderVisible, setOrderVisible] = useState(false);

  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.clear();
    await signOut(auth);
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };
  return (
    <div className="flex bg-[#212121] h-screen w-screen text-white">
      <div className="grid grid-cols-1 border h-screen content-center justify-center items-center border-gray-500 p-10">
        <div>
          <strong className="text-gray-500 py-3 px-10">User</strong>
          <div
            className="cursor-default rounded-2xl transition-all hover:bg-gray-600 my-3 py-3 px-10"
            onClick={() => {
              setProfileVisible(true);
              setOrderVisible(false);
            }}
          >
            Profile
          </div>
          <div
            className="cursor-default rounded-2xl hover:bg-gray-600 px-10 py-3"
            onClick={() => {
              setProfileVisible(false);
              setOrderVisible(true);
            }}
          >
            Orders
          </div>
          <button
            onClick={handleLogout}
            className="fixed bottom-10 p-3 rounded-2xl bg-red-600 px-10"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="h-screen">
        {profileVisible && <Account />}
        {orderVisible && <Orders />}
      </div>
    </div>
  );
}

export default Profile;
