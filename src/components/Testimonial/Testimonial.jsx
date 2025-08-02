import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import Loader from "../../common/loader";

const testimonialData = [
  {
    id: 1,
    name: "ร้าน MixNMatch 1",
    time: "28 - 29 เมษายน 2022",
    place: "พัทยา,ชลบุรี",
    text: "ประวัติศาสตร์อันยาวนานของเทศกาลดนตรี EDM อย่าง Creamfields ทำให้ Line-up ของดีเจจะมีเเเต่ดีเจระดับเเนวหน้าของโลกมาร่วมงานนี้ เช่น R3hab, JAUZ เเละอื่นๆอีกมากมาย🔥 ที่จะมาสร้างสีสรรค์เเละอัดเเน่นไปด้วยความมันส์ตลอดระยะเวลา 2 วันของงานกันเลยทีเดียว",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 1,
    name: "ร้าน MixNMatch 2",
    time: "28 - 29 เมษายน 2022",
    place: "พัทยา,ชลบุรี",
    text: "ประวัติศาสตร์อันยาวนานของเทศกาลดนตรี EDM อย่าง Creamfields ทำให้ Line-up ของดีเจจะมีเเเต่ดีเจระดับเเนวหน้าของโลกมาร่วมงานนี้ เช่น R3hab, JAUZ เเละอื่นๆอีกมากมาย🔥 ที่จะมาสร้างสีสรรค์เเละอัดเเน่นไปด้วยความมันส์ตลอดระยะเวลา 2 วันของงานกันเลยทีเดียว",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 1,
    name: "ร้าน MixNMatch 3",
    time: "28 - 29 เมษายน 2022",
    place: "พัทยา,ชลบุรี",
    text: "ประวัติศาสตร์อันยาวนานของเทศกาลดนตรี EDM อย่าง Creamfields ทำให้ Line-up ของดีเจจะมีเเเต่ดีเจระดับเเนวหน้าของโลกมาร่วมงานนี้ เช่น R3hab, JAUZ เเละอื่นๆอีกมากมาย🔥 ที่จะมาสร้างสีสรรค์เเละอัดเเน่นไปด้วยความมันส์ตลอดระยะเวลา 2 วันของงานกันเลยทีเดียว",
    img: "https://picsum.photos/103/103",
  },

  // {
  //   id: 1,
  //   name: "Smith",
  //   text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
  //   img: "https://picsum.photos/103/103",
  // },
];

const Testimonial = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  // // useEffect(() => {
  // //   //แก้อันนี้
  // //   setTimeout(() => setLoading(false), 1000);
  // // }, []);
  // useEffect(() => {
  //   const fetchAPI = async () => {
  //     try {
  //       setLoading(true);
  //       let response = await axios.get(
  //         "https://jsonplaceholder.typicode.com/posts"
  //       );
  //       setData(response.data);
  //       console.log("Success fetching dataII:", response.data[1]);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAPI();
  // }, []);

  // loading ? (
  //   // เปลี่ยน loading เป็น true
  //   <Loader />
  // ) :
  return (
    <>
      {/* <div data-aos="fade-up" data-aos-duration="300" className="py-12">
        <div className="container">
          <div className="text-center mb-20 max-w-[500px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"></p>
            <h1 className="text-3xl font-bold">Incoming Events</h1>
            <p className="font-custom text-xl text-gray-700">
              {" "}
              พบกับงานอีเวนท์ คอนเสิร์ต และพบนักร้องคนดังมากมายเร็วๆนี้
              ได้ที่ร้านดังของเรา มากมายหลายสถานที่
            </p>
          </div>

          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[1500px] mx-auto gap-6"
          >
            <Slider {...settings}>
              {testimonialData.map(({ id, name, text, img }) => {
                return (
                  <div key={id} className="my-6">
                    <div className="flex flex-col justify-center items-center gap-4 text-center shadow-lg p-4 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                      <img
                        src={img}
                        alt=""
                        className="rounded-full block mx-auto"
                      />
                      <h1 className="text-white text-xl font-bold">{name}</h1>
                      <p className="text-white text-sm">{text}</p>
                      <p className="text-white text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Testimonial;
