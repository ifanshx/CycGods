import React, { useState } from "react";
import Image from "next/image";
import DocumentHead from "@/components/Molecules/DocumentHead";
import { ChevronRightIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { New_Rocker } from "next/font/google";

const NewRocker = New_Rocker({ weight: "400", subsets: ["latin"] });

const Mint = () => {
  const [mintAmount, setMintAmount] = useState(1);

  const handleDecrement = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const handleIncrement = () => {
    if (mintAmount < 25) {
      setMintAmount(mintAmount + 1);
    }
  };

  return (
    <>
      <DocumentHead
        title="CycGods! - Mint"
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
          Mint
        </h1>
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <RocketLaunchIcon className="w-4 h-4" />
          </li>
          <li>
            <ChevronRightIcon className="w-3 h-3" />
          </li>
          <li className={` ${NewRocker.className} font-medium`}>Minting</li>
        </ul>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5 text-[12px]">
        <div
          className={` ${NewRocker.className} border border-[#FFDEB5]  rounded-lg bg-white shadow-sm p-4 text-center`}
        >
          <p className="text-gray-900 text-lg font-semibold">Price</p>
          <p className="text-2xl font-semibold text-black mt-2">0.01 ETH</p>
        </div>
        <div
          className={` ${NewRocker.className} border border-[#FFDEB5]  rounded-lg bg-white shadow-sm p-4 text-center`}
        >
          <p className="text-gray-900 text-lg font-semibold">Your Minted</p>
          <p className="text-2xl font-semibold text-black mt-2">5</p>
        </div>
        <div
          className={` ${NewRocker.className} border border-[#FFDEB5]  rounded-lg bg-white shadow-sm p-4 text-center`}
        >
          <p className="text-gray-900 text-lg font-semibold">Supply</p>
          <p className="text-2xl font-semibold text-black mt-2">1111 / 2000</p>
        </div>
      </div>

      <div className="p-4 mb-4 border border-[#FFDEB5] bg-white shadow-md rounded-lg">
        <h2
          className={` ${NewRocker.className} mb-4 text-2xl font-bold text-gray-900 text-center`}
        >
          Mint CycGods NFT
        </h2>

        <div className="mb-4">
          <Image
            src="/assets/CycGods.gif"
            alt="Logo"
            width={320}
            height={320}
            className="mx-auto object-cover object-center bg-white rounded-2xl"
          />
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-900 text-sm"
          >
            -
          </button>
          <input
            readOnly
            type="number"
            value={mintAmount}
            className="  w-16 h-12 bg-gradient-to-br from-gray-300 to-white shadow-lg text-center text-xs font-semibold border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-900 text-sm"
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-center  mt-2">
          <button className="w-60  py-3 mt-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-gray-900 text-sm">
            Mint Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Mint;
