import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CustomSlider from "./components/custom.slider";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text; // No truncation needed
  } else {
    return text.slice(0, maxLength); // Slice the string and add ellipsis
    // + "...";
  }
}
export default function Playlistdisplay() {
  const location = useLocation();
  const { someData } = location.state || {};

  const images = someData.map((user) => ({
    imgURL: user.displayimage,
    imgAlt: `${truncateText(user.displaytext, 70)}`,
    //Banner image for
  }));

  return (
    <div className="App">
      <CustomSlider>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.imgURL}
              alt={image.imgAlt}
              className="w-full h-auto object-fit: cover"
            />
            <div className="font-custom font-bold text-3xl slider__item-description">
              " {image.imgAlt} "
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  );
}

// return (
//   <div className="App">
//     <CustomSlider>
//       {images.map((image, index) => (
//         <img key={index} src={image.imgURL} alt={image.imgAlt} />
//       ))}
//     </CustomSlider>
//     <div className="info">
//       <h1>ReactJS Slider {someData.length}</h1>
//       <h2>Features</h2>
//       <ul>
//         <li>
//           <p>Autoplay</p>
//         </li>
//         <li>
//           <p>Next and Previous Buttons</p>
//         </li>
//         <li>
//           <p>Select a desired slide</p>
//         </li>
//       </ul>
//       <h3>Made by rem029</h3>
//     </div>
//   </div>
// );
