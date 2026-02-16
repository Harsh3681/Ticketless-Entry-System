import React from "react";

function SnackBar({ message }) {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white text-center px-6 py-2 rounded-3xl shadow-lg">
        <div
          className="p-2 bg-white items-center text-purple-500 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="font-semibold mr-2 text-left flex-auto">
            {message}
          </span>
          <svg
            className="fill-current opacity-75 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SnackBar;
