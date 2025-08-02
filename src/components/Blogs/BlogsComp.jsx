import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/blog1.png";
import Img2 from "../../assets/places/blog2.png";
import Img3 from "../../assets/places/blog3.png";

const BlogsData = [
  // {
  //   id: 1,
  //   bannerimage: Img1,
  //   blogtitle: "15 บาร์ไวบ์ดี นาทีนี้ต้องมาเช็คอิน",
  //   blogdesc:
  //     "หากคุณกำลังมองหาประสบการณ์การดื่มไวน์ในบรรยากาศดี ๆ บอกเลยว่าคอนเทนต์นี้เราได้รวบรวมไวน์บาร์ในกรุงเทพฯ ที่น่าไปเยือน ทั้งร้านเก่าแก่ในตำนาน และร้านเปิดใหม่สุดปัง ให้ทุกคนนั้นได้พาคนรัก หรือแก๊งเพื่อนไปจิบไวน์หลากยี่ห้อจากนานาประเทศที่แต่ละร้านได้เลือกสรรมา แอบบอกว่าร้านที่เลือกมานั้นยังตกแต่งอย่างสวยงามสามารถถ่ายรูปสวย ๆ ได้อีกด้วย รับรองว่าถูกใจแน่นอน จะมีที่ไหนบ้าง ตามไปดูกันได้เลย~~",
  //   // author: "Siam2nite",
  //   // date: "April 22, 2024",
  // },
  // {
  //   id: 1,
  //   image: Img2,
  //   title: "พาเที่ยวร้านน่านั่งย่านทองหล่อเอกมัย",
  //   description:
  //     "ไปตี้ที่ตึกลิเบอร์ตี้ พลาซ่า ตึกเก่าในตำนานที่กลับมาครึกครื้นอีกครั้ง ซึ่งตอนนี้มีร้านใหม่ ๆ มาเปิดเพียบเลย เดี๋ยวเราจะพาทัวร์ทั้งหมด 3 ร้านที่บอกเลยว่าเด็ดมาก! พร้อมแนะนำแท็กซี่มาตรฐานใหม่ หรูหรา พรีเมียมในราคาสบายกระเป๋า ที่หากใครตี้ดึกแค่ไหน ก็กลับได้สบายใจหายห่วง",
  //   author: "Siam2nite",
  //   date: "April 22, 2024",
  // },
  // {
  //   id: 1,
  //   image: Img3,
  //   title: "แจกพิกัดบาร์จัดไพรเวทปาร์ตี้!",
  //   description:
  //     "นัดปาร์ตี้รวมแก๊งทั้งทีก็อยากสนุก สุดเหวี่ยงแบบเต็มที่ และบรรยากาศ privacy แบบเป็นส่วนตั๊วส่วนตัว โพสต์นี้ ได้รวบรวมพิกัดบาร์ และร้านอาหารรับจัดไพรเวทปาร์ตี้! บรรยากาศดี พร้อมมีอาหาร เครื่องดื่ม และดนตรีรองรับ แถมร้านยังสวยปังอลัง ถ่ายรูปทำคอนเทนต์ได้อีกด้วย! ไม่ว่าจะจัดงานวันเกิด Hen Night หรืองานเลี้ยงบริษัท ก็รองรับได้ทุกความต้องการ จะมีที่ไหนบ้าง มาไปดูกันต่อได้เลย~",
  //   author: "Someone",
  //   date: "April 22, 2022",
  // },
  // {
  //   id: 1,
  //   image: Img1,
  //   title: "15 บาร์ไวบ์ดี นาทีนี้ต้องมาเช็คอิน",
  //   description:
  //     "หากคุณกำลังมองหาประสบการณ์การดื่มไวน์ในบรรยากาศดี ๆ บอกเลยว่าคอนเทนต์นี้เราได้รวบรวมไวน์บาร์ในกรุงเทพฯ ที่น่าไปเยือน ทั้งร้านเก่าแก่ในตำนาน และร้านเปิดใหม่สุดปัง ให้ทุกคนนั้นได้พาคนรัก หรือแก๊งเพื่อนไปจิบไวน์หลากยี่ห้อจากนานาประเทศที่แต่ละร้านได้เลือกสรรมา แอบบอกว่าร้านที่เลือกมานั้นยังตกแต่งอย่างสวยงามสามารถถ่ายรูปสวย ๆ ได้อีกด้วย รับรองว่าถูกใจแน่นอน จะมีที่ไหนบ้าง ตามไปดูกันได้เลย~~",
  //   author: "Siam2nite",
  //   date: "April 22, 2024",
  // },
];

const BlogsComp = () => {
  var [blog, setBlog] = useState(BlogsData);
  useEffect(() => {
    // setPlaces(PlacesData);
    GetBlogdata();
  }, []);

  const GetBlogdata = () => {
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

    fetch("http://localhost:8000/blog", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setPlaces(result);
        const filteredblog = result.filter((b) => b.status === 1);
        // Update the state with the filtered places
        setBlog(filteredblog);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className="font-custom my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            บทความที่น่าสนใจ
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {blog.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;
