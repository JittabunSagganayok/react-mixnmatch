import React, { useEffect, useState } from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/place1.jpg";
import Img2 from "../../assets/places/place2.jpg";
import Img3 from "../../assets/places/place3.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";

import Imgi1 from "../../assets/places/healthy-food.png";
import Imgi2 from "../../assets/places/chillicon.png";
import Imgi3 from "../../assets/places/cheers.png";
import Imgi4 from "../../assets/places/karaoke.png";
import Imgi5 from "../../assets/places/beer.png";
import Imgi6 from "../../assets/places/karaoke (1).png";

const PlacesData = [
  {
    id: 1,
    bannerimage: Img1,
    shoptitle: "ฟูเชีย แบงค็อก",
    // location: "ทองหล่อ",
    shopdesc:
      "เปิดประสบการณ์ใหม่ ที่ไนต์คลับสไตล์อาร์ตนูโวใจกลางเมือง รับชมโชว์สุดตระการตาที่ Fuchsia BKK Fuchsia บาร์ใจกลางเมืองย่านสีลม-สาทร ที่ครบครันทั้งในเรื่องเครื่องดื่ม และเอ็นเตอร์เทนเมนต์ที่เป็นไฮไลต์",
    status: 1,
    // type: "ผับและบาร์",
  },
  // {
  //   img: Img2,
  //   title: "เบบี้เฟส ซูเปอร์คลับ",
  //   location: "สุขุมวิท",
  //   description:
  //     "Babyface Superclub (เบบี้เฟส ซูเปอร์คลับ) ไนต์คลับสไตล์อีดีเอ็มสุดพรีเมี่ยมในย่านเอกมัย ที่ออกแบบและตกแต่งได้อย่างเทรนดี้ โดดเด่นด้วยโปรดักชั่นที่ติดตั้งไว้ทั่วร้านเพื่อสร้างบรรยากาศปาร์ตี้สนุกๆ ไม่ว่าจะเป็นจอแอลอีดีที่เกือบล้อมรอบแบบ 360 องศา ระบบไฟ ซาวด์ ไพโร วิชวลต่างๆ รวมถึงวางระบบไฮดรอลิกไว้บนเพดานอีกด้วย",
  //   price: 20,
  //   type: "ผับและบาร์",
  // },
  // {
  //   img: Img3,
  //   title: "โดป แอนด์ เดอตี้",
  //   location: "เอกมัย",
  //   description:
  //     "กลับมาอีกครั้งกับร้านในตำนานย่านเอกมัย Dope & Dirty ซึ่งมาครั้งนี้บอกเลยว่าเตรียมความสนุกมาให้ทุกท่านเพียบ ไม่ว่าใครที่เป็นสาย House สาย Tech House หรือ Bass House ก็ห้ามพลาด! บอกเลยว่าแต่ละวันทาง Dope & Dirty จัดไลน์อัพ Djs มาให้แบบจุก ๆ รับรองว่าสนุกทั้งคืน เต้นกันได้ทั้งคืน",
  //   price: 15,
  //   type: "ผับ",
  // },
  // {
  //   img: Img4,
  //   title: "ออนิกซ์",
  //   location: "RCA",
  //   description:
  //     "ONYX (ออนิกซ์) เปิดตัวปี 2014 ในย่านชื่อดังอย่าง RCA เป็นคลับแรกที่ได้จัดอยู่ในอันดับ 71 ของ DJ Mag Top 100 Club List ซึ่งไม่เคยมีคลับกรุงเทพไหนติดอันดับมาก่อน ซึ่งไม่น่าแปลกใจเมื่อคุณได้ไปเยือนด้วยตัวเอง เพราะ ONYX จัดเต็มไม่ว่าจะใช้จอLED ขนาดยักษ์ เครื่องยิงเอฟเฟคบนเวที เครื่องปล่อยควัน ระบบเลเซอร์แสงสีจำนวนมาก",
  //   price: 20,
  //   type: "ร้านเหล้า",
  // },
  // {
  //   img: Img5,
  //   title: "Flashback Rooftop",
  //   location: "สุขุมวิท",
  //   description:
  //     "บาร์สีชมพู Flashback Rooftop Bar พูตกแต่งสไตล์ Retro กับไฟนีออนสวย ๆ ใครที่รักการถ่ายรูปจะต้องชอบ ถ่ายได้ตั้งแต่ทางเข้าเลยค่ะซิส! แนะนำว่าให้มาเก็บบรรยากาศตั้งแต่ช่วงเย็นเลยนะ จะได้ฟีลแสงเย็นพระอาทิตย์ตกแบบโรแมนติก พอค่ำปุ๊ปเค้าก็จะเปิดไฟสลัว ๆ แสงนัวสวยมากเลย vibe คือดีไม่ไหว~ นั่งมองวิวใจกลางเมือง ปล่อยใจกันไปสบาย ๆ",
  //   price: 5,
  //   type: "บาร์",
  // },
  // {
  //   img: Img6,
  //   title: "Joe’s Whisper",
  //   location: "รัชดา",
  //   description:
  //     "บาร์สไตล์คลาสสิคชิค ๆ ย่านสีลมที่รับรองว่าทุกคนต้องชอบกับ Joe’s Whisper ในย่านที่มีคนพลุกพล่านอย่างสีลม ก็มีร้านน่านั่งเปิดใหม่ที่จะพาทุกคนไปดื่มด่ำกับบรรยากาศสุดคลาสสิคแบบ Old School ซึ่งท่ีนี่ได้กำหนดคาแรคเตอร์ร้านคือลุงโจ ‘Joe’ ที่เป็นเหมือนตัวแทนร้านทั้งการตกแต่ง อาหาร และเครื่องดื่ม เข้ามาแล้วจะพบว่าคาแรคเตอร์ที่นี่ชัดเจนมากจริง ๆ อย่างตัวร้านจะตกแต่งโทนสีน้ำตาลเน้นไปที่เฟอร์นิเจอร์ไม้ทั้งหมดให้ความคลาสสิคมีกลิ่นอายความคลาสซี่ แต่ก็ยังรู้สึกที่ผ่อนคลาย สบาย ๆ และอบอุ่น",
  //   price: 30,
  //   type: "ร้านอาหาร/บาร์",
  // },
];

const Places = () => {
  var [places, setPlaces] = useState(PlacesData);
  useEffect(() => {
    // setPlaces(PlacesData);
    GetPlacedata();
  }, []);

  const GetPlacedata = () => {
    // Get the JWT token from the cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("_auth="));
    const token = cookieValue ? cookieValue.split("=")[1] : null;

    if (!token) {
      console.error("Missing JWT token in cookie");
      // return; // Handle missing token scenario (e.g., redirect to login)
    }
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      // headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:8000/shoprecom", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setPlaces(result);
        const filteredPlaces = result.filter((place) => place.status === 1);
        // Update the state with the filtered places
        setPlaces(filteredPlaces);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <div class="p-8 bg-white rounded-lg shadow dark:bg-gray-800">
            {/* <p class="text-3xl font-bold text-center text-gray-800 dark:text-white">
              The big team
            </p>
            <p class="mb-12 text-xl font-normal text-center text-gray-500 dark:text-gray-300">
              Meat the best team in wolrd
            </p> */}
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi1}
                        class="mx-auto object-cover rounded-full h-20 w-20 
                        "
                        // bg-white
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="font-custom text-lg font-medium text-gray-600 dark:text-white">
                      ร้านอาหาร
                    </span>
                    <span class="text-xs text-gray-400">Restaurant</span>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi2}
                        class="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                      ร้านนั่งชิล
                    </span>
                    <span class="text-xs text-gray-400">Chilling</span>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi3}
                        class="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                      ผับ
                    </span>
                    <span class="text-xs text-gray-400">Pub</span>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi4}
                        class="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                      คาราโอเกะ
                    </span>
                    <span class="text-xs text-gray-400">Karaoke</span>
                  </div>
                </div>
              </div>
              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi5}
                        class="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                      ร้านบาร์
                    </span>
                    <span class="text-xs text-gray-400">Bar</span>
                  </div>
                </div>
              </div>

              <div class="p-4">
                <div class="flex-col  flex justify-center items-center">
                  <div class="flex-shrink-0">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={Imgi6}
                        class="mx-auto object-cover rounded-full h-20 w-20 "
                      />
                    </a>
                  </div>
                  <div class="mt-2 text-center flex flex-col">
                    <span class="text-lg font-medium text-gray-600 dark:text-white">
                      ดนตรีสด
                    </span>
                    <span class="text-xs text-gray-400">Folk Song</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-custom my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            ร้านแนะนำ
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {places.map((item, index) => (
              <PlaceCard
                // handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
