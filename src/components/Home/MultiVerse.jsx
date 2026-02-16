import React, { useEffect, useState } from "react";
import { useData } from "../../Layout/Layout";
import { useBookContext } from "../../Context/BookContext";

function MultiVerse() {
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [data, setData] = useData();
  const [dateErrorVisible, setDateErrorVisible] = useState(false);
  const [slotErrorVisible, setSlotErrorVisible] = useState(false);

  const { setTimelineVisible, setPersonelInfoVisible, setPlaceVisible } =
    useBookContext();

  const handleRadio = (slot) => {
    const ids = ["morning", "afternoon", "evening"];
    setSlotErrorVisible(false);
    ids.map((val, key) => {
      if (val === slot) {
        setSlot(val);
        document.getElementById(val).checked = true;
      } else document.getElementById(val).checked = false;
    });
  };

  useEffect(() => {
    if (data?.date) {
      setDate(date?.date);
    }
    if (date?.slot) {
      handleRadio(data?.slot);
    }
  }, [data]);

  const handleDatePicker = (e) => {
    // console.log(e);
  };

  const handleDateChange = (e) => {
    setDateErrorVisible(false);
    setDate(e.target.value);
  };

  const handleContinue = (e) => {
    if (!date) {
      setDateErrorVisible(true);
    } else if (!slot) {
      setSlotErrorVisible(true);
    } else {
      let date1 = new Date(date).getTime();
      let date2 = new Date().getTime();
      if (date1 < date2) {
        setDateErrorVisible(true);
        return;
      }

      let dateString = new Date(date).toDateString();
      setData({ ...data, date: dateString, slot: slot });
      setTimelineVisible(false);
      setPersonelInfoVisible(true);
    }
  };

  return (
    <div className="grid h-screen w-screen p-5 text-center place-items-center bg-[#212121] text-white">
      <div className="border border-white-600 rounded-3xl items-center grid w-2/4 h-3/5 place-items-center py-5">
        {/* <strong className='text-white-500'>
          Choose Date
        </strong> */}
        <input
          value={date}
          onChange={handleDateChange}
          type="date"
          onFocus={handleDatePicker}
          name=""
          id=""
          className="rounded-full w-2/4 border border-gray-600 hover:border-red-500 py-4 px-10 bg-[#363636]"
        />
        {dateErrorVisible && (
          <strong className="text-red-500">Choose Correct Date</strong>
        )}
        {/* <strong className='text-white-500'>
          Choose Slot
        </strong> */}
        <div
          className="rounded-full w-2/4 border border-gray-600 hover:border-red-500 py-4 px-10 "
          onClick={() => handleRadio("morning")}
        >
          <input
            type="radio"
            name="morning"
            id="morning"
            className="mr-3 accent-red-500 focus:accent-red-600"
          />
          <strong>morning slot</strong>
        </div>
        <div
          className="rounded-full w-2/4 border border-gray-600 hover:border-red-500 py-4 px-10"
          onClick={() => handleRadio("afternoon")}
        >
          <input
            type="radio"
            name="afternoon"
            id="afternoon"
            className="mr-3 accent-red-500 focus:accent-red-600"
          />
          <strong>AfterNoon slot</strong>
        </div>
        <div
          className="rounded-full w-2/4 border border-gray-600 hover:border-red-500 py-4 px-10 mb-10"
          onClick={() => handleRadio("evening")}
        >
          <input
            type="radio"
            name="evening"
            id="evening"
            className="mr-3 accent-red-500 focus:accent-red-600"
          />
          <strong>Evening slot</strong>
        </div>
        {slotErrorVisible && (
          <strong className="text-red-500">Choose Date</strong>
        )}
        <div className="flex w-3/4 items-center justify-around">
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={() => {
              setPlaceVisible(true);
              setTimelineVisible(false);
            }}
          >
            Back
          </button>
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiVerse;
