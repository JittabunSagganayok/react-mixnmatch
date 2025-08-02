import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero/Hero";
import NatureVid from "../assets/video/main.mp4";
import BlogsComp from "../components/Blogs/BlogsComp";
import Places from "../components/Places/Places";
import Testimonial from "../components/Testimonial/Testimonial";
import Banner from "../components/Banner/Banner";
import BannerPic from "../components/BannerPic/BannerPic";
import BannerImg from "../assets/places/banner2.jpg";
import Banner2 from "../assets/travel-cover2.jpg";
import OrderPopup from "../components/OrderPopup/OrderPopup";
import Loader from "../common/loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   //แก้อันนี้
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setData(response.data);
        console.log("Success fetching data:", response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, []);
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return loading ? (
    // เปลี่ยน loading เป็น true
    <Loader />
  ) : (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <div className="h-[700px] relative flex justify-center items-center">
            <Hero />
          </div>
        </div>
        {/* <h1>{data[0]["title"]}</h1> */}
        <Testimonial />
        <Places handleOrderPopup={handleOrderPopup} />

        <BannerPic img={BannerImg} />

        {/* <BlogsComp />
        <Banner />
        <BannerPic img={Banner2} /> */}

        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
    </>
  );
};

export default Home;
