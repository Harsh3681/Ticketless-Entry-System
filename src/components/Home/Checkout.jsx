import React, { useEffect, useState } from "react";
import { useBookContext } from "../../Context/BookContext";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../../utils/firebase";
import { useData } from "../../Layout/Layout";

function Checkout() {
  const db = getFirestore(app);
  const [ticketInfo, setTicketInfo] = useState({});
  const [data, setData] = useData();
  const {
    setTimelineVisible,
    setPersonelInfoVisible,
    setPlaceVisible,
    setCheckoutVisible,
    setTicketDownloadVisible,
  } = useBookContext();

  useEffect(() => {
    setTicketInfo(data?.ticket);
  }, [data?.ticket]);

  const handleCheckout = async () => {
    // prevent checkout when user not authenticated
    if (!localStorage.getItem("UID")) {
      localStorage.setItem("snackMessage", "Please login first");
      window.dispatchEvent(new Event("snack-change"));
      return;
    }
    const currentTicket = data?.ticket;
    console.log(currentTicket);
    try {
      const ref = await addDoc(collection(db, "Tickets"), currentTicket);
      await updateDoc(doc(db, "Tickets", "TickIDs"), {
        ID: arrayUnion(currentTicket?.tickID),
      });
    } catch (error) {
      console.log(error);
    }
    setCheckoutVisible(false);
    setTicketDownloadVisible(true);
  };
  return (
    <div className="grid h-screen w-screen p-5 text-center place-items-center bg-[#212121] text-white">
      <div className="border border-white-600 rounded-3xl items-center grid w-2/4 h-2/5 place-items-center py-5">
        <strong className="text-white-500">Choose Payment Options</strong>
        <div className="rounded-full w-2/4 border border-gray-600 hover:border-gray-300 py-4 px-10 ">
          <input
            type="radio"
            readOnly
            disabled
            name="morning"
            id="morning"
            className="mr-3 accent-red-500 focus:accent-red-600"
          />
          <strong>Debit/Credit Card</strong>
        </div>
        <div className="rounded-full w-2/4 border border-gray-600 hover:border-red-500 py-4 px-10">
          <input
            type="radio"
            defaultChecked
            name="afternoon"
            id="afternoon"
            className="mr-3 accent-red-500 focus:accent-red-600"
          />
          <strong>Cash</strong>
        </div>
        <div className="flex w-3/4 items-center justify-around">
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={() => {
              setCheckoutVisible(false);
              setPersonelInfoVisible(true);
            }}
          >
            Back
          </button>
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={handleCheckout}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
