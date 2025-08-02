import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const popularProducts = [
  {
    id: "3432",
    product_name: "สมชาย",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "1/4/66",
    product_stock: "50",
  },
  {
    id: "7633",
    product_name: "สมสวย",
    product_thumbnail: "https://source.unsplash.com/100x100?earbuds",
    product_price: "1/4/66",
    product_stock: "40",
  },
  {
    id: "6534",
    product_name: "สมหมาย",
    product_thumbnail: "https://source.unsplash.com/100x100?laptop",
    product_price: "1/4/66",
    product_stock: "20",
  },
  // {
  //   id: "9234",
  //   product_name: "LG Flex Canvas",
  //   product_thumbnail: "https://source.unsplash.com/100x100?smartphone",
  //   product_price: "$499.00",
  //   product_stock: 98,
  // },
  // {
  //   id: "4314",
  //   product_name: "Apple Magic Touchpad",
  //   product_thumbnail: "https://source.unsplash.com/100x100?touchpad",
  //   product_price: "$699.00",
  //   product_stock: 0,
  // },
  // {
  //   id: "4342",
  //   product_name: "Nothing Earbuds One",
  //   product_thumbnail: "https://source.unsplash.com/100x100?earphone",
  //   product_price: "$399.00",
  //   product_stock: 453,
  // },
];

function PopularProducts() {
  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">
        ลำดับรายชื่อลูกค้าประจำ {/* (Check in บ่อย) */}
        {/* //sql query การลำดับรายชื่อลูกค้าประจำ เรียงตามจำนวนการเช็คอิน count
// SELECT u.userId, ch.count
// FROM checkinhistory ch
// INNER JOIN (
//   SELECT userId, MAX(count) AS max_count
//   FROM checkinhistory
//   GROUP BY userId
// ) AS u ON ch.userId = u.userId AND ch.count = u.max_count
// ORDER BY ch.count DESC; */}
      </strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.product_thumbnail}
                alt={product.product_name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.product_name}</p>
              <span
                className={classNames(
                  // product.product_stock === 0
                  //   ? "text-red-500"
                  //   : product.product_stock > 50
                  //   ? "text-green-500"
                  //   : "text-orange-500",
                  "text-green-500",
                  "text-xs font-medium"
                )}
              >
                {/* {product.product_stock === 0
                  ? "Out of Stock"
                  : product.product_stock + " in Stock"} */}
                เช็คอินทั้งหมด : {product.product_stock} ครั้ง
              </span>
            </div>
            <div className="text-xs text-gray-400 pl-1.5">
              เช็คอินล่าสุด {product.product_price}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
