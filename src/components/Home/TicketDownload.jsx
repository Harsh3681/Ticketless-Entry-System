import React, { useEffect, useState } from "react";
import { useBookContext } from "../../Context/BookContext";
import { useData } from "../../Layout/Layout";
import { useNavigate } from "react-router";
import QRCode from "react-qr-code";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function TicketDownload() {
  const [data, setData] = useData();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const {
    setTimelineVisible,
    setPersonelInfoVisible,
    setPlaceVisible,
    setCheckoutVisible,
    setTicketDownloadVisible,
  } = useBookContext();

  useEffect(() => {
    setTicket(data?.ticket);
  }, [data?.ticket]);

  const handleDownload = async () => {
    const ticketElement = document.querySelector(".ticket-info");
    const downElement = document.querySelector(".download-button");

    ticketElement.removeChild(downElement);
    if (!ticketElement) return;

    const canvas = await html2canvas(ticketElement);
    ticketElement.appendChild(downElement);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "ticket.png", "image/png");
  };

  return (
    <div className="grid h-screen w-screen p-5 text-center place-items-center bg-[#212121] text-white">
      <div
        id="ticket-info"
        className="ticket-info relative border border-white-600 rounded-3xl bg-white text-black items-center grid w-2/4 h-3/5 place-items-center"
      >
        <button
          onClick={() => {
            setTicketDownloadVisible(false);
            setPlaceVisible(true);
          }}
          className="absolute top-3 right-3 text-black text-2xl font-bold"
          aria-label="close ticket"
        >
          ×
        </button>
        <strong className="text-white-500">Ticket</strong>
        <img src={"images/lohagad.jpg"} className="rounded-full w-20 h-20" />
        <div className="border border-white-600 rounded-3xl items-center grid w-3/4 h-4/8 place-items-center py-2">
          <QRCode
            value={ticket?.tickID ? ticket?.tickID : ""}
            style={{ marginTop: 3 }}
            size={150}
          />
          <strong className="text-white-500 py-2">Date : {ticket?.date}</strong>
          <strong className="text-white-500 py-2">
            Place : {ticket?.place}
          </strong>
          <strong className="text-white-500 py-2">
            Number Of Peoples : {ticket?.peoples}
          </strong>
          <strong className="text-white-500 py-2 ">
            Price : {ticket?.price}
          </strong>
        </div>
        <div className="download-button flex w-3/4 items-center justify-around mb-3">
          <button
            className="rounded-full w-32 bg-red-500 text-white py-2 px-6"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default TicketDownload;
