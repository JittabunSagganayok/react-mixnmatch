import React from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
const BannerPic = ({ img }) => {
  const bgImage = {
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "400px",
  };
  const navigate = useNavigate();
  return (
    <div data-aos="zoom-in" className="h-[400px] w-full" style={bgImage}>
      <div className=" bg-black/20 h-full">
        <div className="h-full flex justify-center items-center p-4 bg-primary/10">
          <div className="container grid grid-cols-1 gap-4">
            <div className="text-white">
              <p data-aos="fade-up" className="text-sm">
                MixnMatch Application
              </p>
              <p
                data-aos="fade-up"
                data-aos-delay="300"
                className="font-bold text-3xl"
              >
                Join Our Partner
              </p>

              <div data-aos="zoom-in" className="px-12 py-5">
                <button
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200  -bottom-5 left-1/2 -translate-x-1/2"
                  onClick={() => {
                    // handleOrderPopup();
                    navigate("/auth/signup");
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerPic;
