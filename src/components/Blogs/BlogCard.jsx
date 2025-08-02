import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, bannerimage, blogtitle, blogdesc }) => {
  return (
    <>
      <Link
        to={`/blogs/${id}`}
        onClick={() => {
          window.scrollTo(0, 0);
          // window.scroll({
          //   top: 0,
          //   left: 0,
          //   behavior: "smooth",
          // });
        }}
        state={{ id, bannerimage, blogtitle, blogdesc }}
      >
        <div className="p-4 shadow-lg transition-all duration-500 hover:shadow-xl dark:bg-slate-950 dark:text-white">
          <div className="overflow-hidden">
            <img
              src={bannerimage}
              alt="No image"
              className="mx-auto h-[250px] w-full object-cover transition duration-700 hover:skew-x-2 hover:scale-110"
            />
          </div>
          <div className="flex justify-between pt-2 text-slate-600">
            <p>May 1, 2024</p>
            <p className="line-clamp-1">By Siam2nite</p>
          </div>
          <div className="space-y-2 py-3">
            <h1 className="line-clamp-1 font-bold">{blogtitle}</h1>
            <p className="line-clamp-2">{blogdesc}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
