import React, { useEffect } from "react";
import QRCode from "react-qr-code";

function Ticket({ data }) {
  useEffect(() => {}, []);
  return (
    <div className="border border-white-600 bg-white text-black rounded-3xl items-center grid place-items-center py-2 ">
      <QRCode
        value={data?.tickID ? data?.tickID : ""}
        style={{ marginTop: 3 }}
        size={100}
      />
      <strong className="text-black py-2">Date : {data?.date}</strong>
      <strong className="text-black py-2">Place : {data?.place}</strong>
      <strong className="text-black py-2">
        Number Of Peoples : {data?.peoples}
      </strong>
      <strong className="text-black py-2 ">Price : {data?.price}</strong>
    </div>
  );
}

export default Ticket;
