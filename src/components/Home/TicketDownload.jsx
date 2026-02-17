// import React, { useEffect, useState, useRef } from "react";
// import { useBookContext } from "../../Context/BookContext";
// import { useData } from "../../Layout/Layout";
// import { useNavigate } from "react-router";
// import QRCode from "react-qr-code";
// import downloadjs from "downloadjs";
// import html2canvas from "html2canvas";

// function TicketDownload() {
//   const [data] = useData();
//   const navigate = useNavigate();
//   const [ticket, setTicket] = useState(null);
//   const [isDownloading, setIsDownloading] = useState(false);
//   const ticketRef = useRef(null);

//   const { setPlaceVisible, setTicketDownloadVisible } = useBookContext();

//   useEffect(() => {
//     if (data?.ticket) {
//       setTicket(data.ticket);
//     }
//   }, [data?.ticket]);

//   const handleDownload = async () => {
//     if (!ticketRef.current) return;

//     try {
//       setIsDownloading(true);

//       const canvas = await html2canvas(ticketRef.current, {
//         scale: 2, // Higher quality
//       });

//       const dataURL = canvas.toDataURL("image/png");
//       downloadjs(dataURL, "ticket.png", "image/png");
//     } catch (error) {
//       console.error("Download failed:", error);
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="grid h-screen w-screen p-5 text-center place-items-center bg-[#212121] text-white">
//       <div
//         ref={ticketRef}
//         className="relative border rounded-3xl bg-white text-black items-center grid w-2/4 h-3/5 place-items-center p-5"
//       >
//         {/* Close Button */}
//         <button
//           onClick={() => {
//             setTicketDownloadVisible(false);
//             setPlaceVisible(true);
//           }}
//           className="absolute top-3 right-3 text-black text-2xl font-bold"
//           aria-label="close ticket"
//         >
//           ×
//         </button>

//         <strong className="text-xl">Ticket</strong>

//         {/* Image */}
//         <img
//           src="/images/lohagad.jpg"
//           alt="Place"
//           className="rounded-full w-20 h-20 object-cover"
//         />

//         {/* Ticket Info */}
//         <div className="border rounded-3xl items-center grid w-3/4 place-items-center py-4 px-3">
//           <QRCode
//             value={ticket ? `TICKET:${ticket.tickID}` : "TICKET-EMPTY"}
//             size={180}
//             bgColor="#ffffff"
//             fgColor="#000000"
//             level="H"
//           />

//           <div className="mt-4 space-y-2">
//             <p>
//               <strong>Date:</strong> {ticket?.date}
//             </p>
//             <p>
//               <strong>Place:</strong> {ticket?.place}
//             </p>
//             <p>
//               <strong>Number Of People:</strong> {ticket?.peoples}
//             </p>
//             <p>
//               <strong>Price:</strong> ₹{ticket?.price}
//             </p>
//           </div>
//         </div>

//         {/* Download Button */}
//         {!isDownloading && (
//           <div className="flex w-3/4 items-center justify-around mt-4">
//             <button
//               className="rounded-full w-32 bg-red-500 text-white py-2 px-6 hover:bg-red-600 transition"
//               onClick={handleDownload}
//             >
//               Download
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default TicketDownload;

import React, { useEffect, useState, useRef } from "react";
import { useBookContext } from "../../Context/BookContext";
import { useData } from "../../Layout/Layout";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function TicketDownload() {
  const [data] = useData();
  const [ticket, setTicket] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef(null);

  const { setPlaceVisible, setTicketDownloadVisible } = useBookContext();

  useEffect(() => {
    if (data?.ticket) {
      setTicket(data.ticket);
    }
  }, [data?.ticket]);

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(ticketRef.current, {
        scale: 3,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("portrait", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 10, width, height);
      pdf.save(`ticket-${ticket?.tickID}.pdf`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div
        ref={ticketRef}
        className="relative bg-white w-[420px] rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <h1 className="text-6xl font-bold rotate-[-30deg] text-gray-800">
            VERIFIED
          </h1>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide">
            Historical Entry Pass
          </h1>
          <p className="text-sm">Ticket ID: {ticket?.tickID}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Date</span>
            <span className="font-semibold">{ticket?.date}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Place</span>
            <span className="font-semibold">{ticket?.place}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Total Visitors</span>
            <span className="font-semibold">{ticket?.peoples}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Slot</span>
            <span className="font-semibold">{ticket?.slot}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Price</span>
            <span className="font-semibold">₹{ticket?.price}</span>
          </div>

          {/* QR */}
          <div className="flex justify-center pt-4">
            <QRCode
              value={JSON.stringify({
                id: ticket?.tickID,
                uid: ticket?.UID,
              })}
              size={140}
              level="H"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 text-center text-xs text-gray-500">
          This ticket is digitally generated and secure.
        </div>
      </div>

      {/* Download Button */}
      <div className="ml-10">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default TicketDownload;
