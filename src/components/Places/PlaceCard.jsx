import React from "react";
import { IoLocationSharp } from "react-icons/io5";

const PlaceCard = ({
  id,
  bannerimage,
  shoptitle,
  shopdesc,
  status,
  // type,
  // handleOrderPopup,
}) => {
  return (
    <>
      <div
        className="shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white cursor-pointer"
        // onClick={handleOrderPopup}
      >
        <div className="overflow-hidden">
          <img
            src={bannerimage}
            alt="No image"
            className="mx-auto h-[220px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
          />
        </div>

        <div className="space-y-2 p-3">
          <h1 className="line-clamp-1 font-bold text-xl">
            {shoptitle.split(" ")[0]}
          </h1>
          <div className="flex items-center gap-2 opacity-70">
            <IoLocationSharp />
            <span className="font-custom"> {shoptitle.split(" ")[1]}</span>
          </div>
          <p className="font-custom line-clamp-2">{shopdesc}</p>
          <div className="flex items-center justify-between border-t-2 py-3 !mt-3">
            <div className="opacity-70">
              {/* <p className="font-custom">{type}</p> */}
            </div>
            <div>
              {/* <p className="font-custom text-lg font-bold">
                จองผ่านแอพลด {price} %
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceCard;
