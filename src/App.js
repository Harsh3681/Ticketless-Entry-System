import { createContext, useContext, useState } from "react";
import Places from "./components/Home/Places";
import MultiVerse from "./components/Home/MultiVerse";
import { BookContext } from "./Context/BookContext";
import PersonelInfo from "./components/Home/PersonelInfo";
import Checkout from "./components/Home/Checkout";
import TicketDownload from "./components/Home/TicketDownload";

export default function App() {

  const [placeVisible, setPlaceVisible] = useState(true)
  const [timelineVisible, setTimelineVisible] = useState(false)
  const [personelInfoVisible, setPersonelInfoVisible] = useState(false)
  const [checkoutVisible, setCheckoutVisible] = useState(false)
  const [ticketDownloadVisible, setTicketDownloadVisible] = useState(false)

  const handlePlaceClick = (place) => {
      setPlaceVisible(false)
  }
  return (
    <BookContext.Provider value={{setPlaceVisible,setTimelineVisible,setPersonelInfoVisible,setCheckoutVisible,setTicketDownloadVisible}}>
      <div className="bg-[#212121] text-white h-screen w-screen">
        {placeVisible && <Places />}
        {timelineVisible && <MultiVerse/>}
        {personelInfoVisible && <PersonelInfo/>}
        {checkoutVisible && <Checkout/>}
        {ticketDownloadVisible && <TicketDownload/>}
      </div>
    </BookContext.Provider>
  )
}
