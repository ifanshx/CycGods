import React, { useState } from "react";

import DocumentHead from "@/components/Molecules/DocumentHead";
import {
  ChevronRightIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { New_Rocker } from "next/font/google";
import Image from "next/image";

const NewRocker = New_Rocker({ weight: "400", subsets: ["latin"] });

const Harvest = () => {
  return (
    <>
      <DocumentHead
        title="CycGods! - Harvest"
        description="CycGods"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <section className="mb-8 mt-4">
        <h1
          className={` ${NewRocker.className} text-4xl font-bold text-gray-900 `}
        >
          Harvest
        </h1>
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <CurrencyDollarIcon className="w-4 h-4" />
          </li>
          <li>
            <ChevronRightIcon className="w-3 h-3" />
          </li>
          <li className={` ${NewRocker.className} font-medium`}>Harvest</li>
        </ul>
      </section>

      <div className="grid grid-cols-3 text-center lg:grid-cols-3 gap-6 mb-5 text-[12px]">
        <div
          className={` ${NewRocker.className} border border-black  rounded-lg bg-white shadow-sm p-4 `}
        >
          Your NFT :{" "}
          <p className=" text-[20px] lg:text-[40px] font-semibold  ">10</p>
        </div>
        <div
          className={` ${NewRocker.className} border border-black  rounded-lg bg-white shadow-sm p-4 `}
        >
          Your Staked :{" "}
          <p className="text-[20px] lg:text-[40px]  font-semibold  ">5</p>
        </div>
        <div
          className={` ${NewRocker.className} border border-black  rounded-lg bg-white shadow-sm p-4 `}
        >
          Total Earn :{" "}
          <p className=" text-[20px] lg:text-[40px]  font-semibold  ">
            20.015 Cyc
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-6 mb-5">
        <div className="p-4 mb-5 border border-black  bg-white shadow-md rounded-lg">
          <p
            className={` ${NewRocker.className}  text-[20px] font-semibold mb-4 `}
          >
            Your CycGods :{" "}
          </p>
          <div className=" gap-2 grid grid-cols-3 lg:grid-cols-3  ">
            {/* Contoh */}
            {Array.from({ length: 5 }, (_, index) => (
              <div className="cursor-pointer " key={index}>
                <div className="py-2 bg-[#DFFE00] rounded-2xl md:rounded-3xl lg:rounded-3xl">
                  <div className="overflow-hidden px-2 ">
                    <Image
                      src={`/assets/Cyc/${index + 3}.png`}
                      alt={`Item ${index + 3}`}
                      width={150}
                      height={150}
                      className="object-cover object-center bg-white rounded-2xl"
                    />
                  </div>
                  <div className="px-4">
                    <div className="flex flex-row justify-between items-start text-[10px] md:text-sm lg:text-sm text-black font-semibold pt-2 lg:pb-1">
                      <a
                        href={`https://www.tensor.trade/item/${index + 3}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 cursor-pointer"
                      >
                        CycGods
                      </a>
                      <p className="font-medium">R: {index + 3}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Contoh */}
          </div>
        </div>
        <div className="p-4 mb-5  bg-white border border-black   shadow-md rounded-lg">
          <p
            className={` ${NewRocker.className} text-[20px] font-semibold mb-4 `}
          >
            Your Staked :{" "}
          </p>
          <div className=" gap-2 grid grid-cols-3 lg:grid-cols-3  ">
            {/* Contoh */}
            {Array.from({ length: 10 }, (_, index) => (
              <div className="cursor-pointer " key={index}>
                <div className="py-2 bg-[#DFFE00] rounded-2xl md:rounded-3xl lg:rounded-3xl">
                  <div className="overflow-hidden px-2 ">
                    <Image
                      src={`/assets/Cyc/${index + 2}.png`}
                      alt={`Item ${index + 2}`}
                      width={150}
                      height={150}
                      className="object-cover object-center bg-white rounded-2xl"
                    />
                  </div>
                  <div className="px-4">
                    <div className="flex flex-row justify-between items-start text-[10px] md:text-sm lg:text-sm text-black font-semibold pt-2 lg:pb-1">
                      <a
                        href={`https://www.tensor.trade/item/${index + 2}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 cursor-pointer"
                      >
                        CycGods
                      </a>
                      <p className="font-medium">R: {index + 2}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Contoh */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Harvest;
