import React, { useEffect, useState } from "react";
import { useBookContext } from "../../Context/BookContext";
import { useData } from "../../Layout/Layout";
import { v4 as uuidv4 } from "uuid";
function PersonelInfo() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [adultPeople, setAdultPeople] = useState(0);
  const [child, setChild] = useState(0);
  const [price, setPrice] = useState(0);
  const [data, setData] = useData();
  const [nameError, setnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const {
    setTimelineVisible,
    setPersonelInfoVisible,
    setPlaceVisible,
    setCheckoutVisible,
  } = useBookContext();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.firstName);
      setEmail(data?.user?.email);
    }
    if (data?.info) {
      setName(data?.info?.name);
      setEmail(data?.info?.email);
      setAdultPeople(data?.info?.adult);
      setChild(data?.info?.child);
      setPrice(data?.info?.price);
    }
  }, []);

  const handleCheckout = () => {
    if (!name) {
      setnameError(true);
    } else if (!email) {
      setEmailError(true);
    } else if (adultPeople == 0 && child === 0) {
      setNumberError(true);
    } else {
      setData({
        ...data,
        ticket: {
          UID: localStorage.getItem("UID"),
          date: data?.date,
          isVerified: false,
          peoples: Number(adultPeople) + Number(child),
          place: data?.place?.name,
          slot: data?.slot,
          tickID: uuidv4(),
          price: price,
        },
        info: {
          name: name,
          email: email,
          adult: adultPeople,
          child: child,
          price: price,
        },
      });
      setPersonelInfoVisible(false);
      setCheckoutVisible(true);
    }
  };
  return (
    <div className="grid h-screen w-screen p-5 text-center place-items-center bg-[#212121] text-white">
      <div className="border border-white-600 rounded-3xl items-center grid w-2/4 h-3/5 place-items-center py-5">
        <strong className="text-white-500">Related Information</strong>
        <input
          className="p-5 m-5 w-4/5 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          placeholder="Enter Full Name"
          type={"text"}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setnameError(false);
          }}
        />
        {nameError && <strong className="text-red-500">Enter Your Name</strong>}
        <input
          className="p-5 m-5 w-4/5 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
          placeholder="Enter Email"
          type={"email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(false);
          }}
        />
        {emailError && (
          <strong className="text-red-500">Enter Correct EMail</strong>
        )}
        <div className="flex">
          <div className="flex flex-col items-center m-3">
            <strong className="text-white font-bold mb-2">AdultPeople</strong>
            <input
              type="number"
              placeholder="Adult People"
              value={adultPeople}
              onChange={(e) => {
                setAdultPeople(e.target.value);
                setNumberError(false);
                let adultPrice = e.target.value * 30;
                let childPrice = child * (30 * 0.7);
                setPrice(eval(adultPrice + childPrice));
              }}
              className=" p-3 w-40 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
            />
          </div>
          <div className="flex flex-col items-center m-3">
            <strong className="text-white font-bold mb-2">Child</strong>
            <input
              type="number"
              placeholder="Childrens"
              value={child}
              onChange={(e) => {
                setChild(e.target.value);
                setNumberError(false);
                let adultPrice = adultPeople * data?.place?.price;
                let childPrice = e.target.value * (data?.place?.price * 0.7);
                setPrice(eval(adultPrice + childPrice));
              }}
              className="p-3 w-40 h-10 rounded-full border bg-[#363636] text-white border-gray-400 focus:outline-none focus:border-white"
            />
          </div>
        </div>
        {numberError && (
          <strong className="text-red-500">Enter NUmber Of Peoples</strong>
        )}
        <input
          className="p-5 m-5 text-gray-400 w-4/5 h-10 rounded-full border bg-[#363636] border-gray-400 focus:outline-none focus:border-white"
          placeholder="Price"
          disabled
          type={"number"}
          value={price}
        />
        <div className="flex w-3/4 items-center justify-around">
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={() => {
              setTimelineVisible(true);
              setPersonelInfoVisible(false);
            }}
          >
            Back
          </button>
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonelInfo;
