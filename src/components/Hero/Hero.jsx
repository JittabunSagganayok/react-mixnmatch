import React from "react";

import TravelImg from "../../assets/travelbox.png";
import iPhoneMain from "../../assets/iPhonemain.png";
const Hero = () => {
  const [priceValue, setPriceValue] = React.useState(30);

  return (
    <div className=" h-full ">
      <div className="h-full flex justify-center items-center p-4 ">
        <div className="text-white w-full sm:w-1/2 px-4">
          {/* Text content */}
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="font-custom font-bold text-4xl py-1"
          >
            Mix N Match
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="font-custom font-bold text-4xl py-1"
          >
            แอพพลิเคชั่นสำหรับสายเที่ยว
          </p>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="font-custom font-bold text-2xl py-1"
          >
            ดาวน์โหลดเลยตอนนี้ รับสิทธิพิเศษมากมาย
          </p>
          <div class="space-y-8">
            {" "}
            <h1></h1>
            <p></p>
          </div>
          <div className="flex w-[350px]  justify-between">
            {" "}
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-custom font-bold text-3xl py-1"
            >
              <button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200">
                For Android
              </button>
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-custom font-bold text-3xl py-1"
            >
              <button className="bg-gradient-to-r from-secondary to-primary text-white hover:scale-105 px-4 py-2 rounded-full duration-200">
                For iOS
              </button>
            </p>
          </div>
          {/* ... other text content */}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:w-1/2 relative mx-auto">
          <img
            src={iPhoneMain}
            alt="biryani img"
            className="max-w-[550px] h-[480px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;

// <div className="container grid grid-cols-1 gap-4">
//   <div className="text-white">
//     {/* <p data-aos="fade-up" className="text-sm font-bold text-1xl">
//     MixnMatch Application
//   </p> */}
//     <p
//       data-aos="fade-up"
//       data-aos-delay="300"
//       className="font-custom font-bold text-3xl py-1"
//     >
//       แอพพลิเคชั่นสำหรับสายเที่ยว
//     </p>
//     {/* <button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-1 rounded-full duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2">
//     Apply Now
//   </button> */}
//     <div data-aos="flip-up" className="grid grid-cols-3">
//       <img
//         src={iPhoneMain}
//         alt="biryani img"
//         className="max-w-[550px] h-[480px] w-full mx-auto drop-shadow-[5px_5px_12px_rgba(0,0,0,0.7)] object-cover"
//       />
//     </div>
//   </div>
//   {/*  <div
//   data-aos="fade-up"
//   data-aos-delay="600"
//   className="space-y-4 bg-white rounded-md p-4 relative"
// >
//   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3">

//     <div>
//       <label htmlFor="destination" className="opacity-70">
//         Search your Destination
//       </label>
//       <input
//         type="text"
//         name="destination"
//         id="destination"
//         placeholder="Dubai"
//         className="w-full bg-gray-100 my-2 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
//       />
//     </div>
//     <div>
//       <label htmlFor="destination" className="opacity-70">
//         Date
//       </label>
//       <input
//         type="date"
//         name="destination"
//         id="destination"
//         className="w-full !placeholder-slate-400 bg-gray-100 my-2 rounded-full focus:outline-primary focus:outline outline-1 p-2"
//       />
//     </div>
//     <div>
//       <label htmlFor="destination" className="opacity-70 block">
//         <div className="w-full flex justify-between items-center">
//           <p>Max Price</p>
//           <p className="font-bold text-xl">$ {priceValue}</p>
//         </div>
//       </label>
//       <div className=" bg-gray-100 rounded-full p-2 flex items-center justify-center ">
//         <input
//           type="range"
//           name="destination"
//           id="destination"
//           className="appearance-none w-full bg-gradient-to-r from-primary to-secondary h-2 rounded-full my-2"
//           min="150"
//           max="1000"
//           value={priceValue}
//           step="10"
//           onChange={(e) => setPriceValue(e.target.value)}
//         />
//       </div>
//     </div>
//   </div>
//   <button className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 absolute -bottom-5 left-1/2 -translate-x-1/2">
//     Search Now
//   </button>
// </div> */}
// </div>;
