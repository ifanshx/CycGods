import Image from "next/image";
import React from "react";

const images = [
  "/assets/Cyc/1.png",
  "/assets/Cyc/2.png",
  "/assets/Cyc/3.png",
  "/assets/Cyc/4.png",
  "/assets/Cyc/5.png",
  "/assets/Cyc/6.png",
  "/assets/Cyc/7.png",
  "/assets/Cyc/8.png",
  "/assets/Cyc/9.png",
  "/assets/Cyc/10.png",
];

const HeroBanner = () => {
  return (
    <div className="w-full flex">
      {images.map((imagex, index) => (
        <div className="w-50 h-40 m-2  relative" key={index}>
          <Image src={imagex} alt="Cycgods" height={100} width={100} />
        </div>
      ))}
    </div>
  );
};

export default HeroBanner;
