import React from "react";
import { useLocation } from "react-router-dom";
import BlogsComp from "../components/Blogs/BlogsComp";

const BlogsDetails = (props) => {
  const location = useLocation();
  // console.log(props, " props");
  // console.log(location, " useLocation Hook");
  const { id, bannerimage, blogtitle, blogdesc } = location.state;

  return (
    <div className=" pt-20">
      <div className="h-[400px] p-10">
        <img
          src={bannerimage}
          alt={blogtitle}
          className="mx-auto h-[300px] w-full object-cover transition duration-700 hover:scale-110"
        />
      </div>
      <div className="container pb-20">
        <p className="text-slate-600 text-sm py-3">
          {" "}
          written by Siam2nite on May 1, 2024
        </p>
        <h1 className="text-2xl font-semibold">{blogtitle}</h1>
        <p className="pt-5">{blogdesc}</p>
      </div>

      {/* All Blogs Section */}
      <BlogsComp />
    </div>
  );
};

export default BlogsDetails;
