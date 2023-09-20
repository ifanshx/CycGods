import Image from "next/image";
import { New_Rocker } from "next/font/google";
import DocumentHead from "@/components/Molecules/DocumentHead";
import {
  BuildingLibraryIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const NewRocker = New_Rocker({ weight: "400", subsets: ["latin"] }); // Removed quotes around weight value

export default function Home() {
  const { data }: any = useSession();
  return (
    <>
      <DocumentHead
        title="CycGods!"
        description="CycGods!"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <section className="mb-2 mt-4">
        <h1
          className={` ${NewRocker.className} text-4xl font-bold text-gray-900`}
        >
          Home
        </h1>
        <ul className="flex items-center gap-2 text-gray-500 text-sm">
          <li>
            <BuildingLibraryIcon className="h-4 w-4" />
          </li>
          <li>
            <ChevronRightIcon className="h-3 w-3" />
          </li>

          {data ? (
            <li className={`${NewRocker.className} font-medium`}>
              Hi, {data && data.user.fullname}
            </li>
          ) : (
            <li className={`${NewRocker.className} font-medium`}>Home</li>
          )}
        </ul>
      </section>
      <div className="grid grid-cols-1  sm:grid-cols-2 mb-1 justify-center items-center space-x-0 sm:space-x-10">
        <div className="flex flex-col text-center sm:text-left">
          <p
            className={` ${NewRocker.className} text-6xl sm:text-6xl font-extrabold  mb-1 `}
          >
            CycGods
          </p>
          <p className="text-lg font-bold text-gray-700 mt-2">
            We help fans discover art and artists they love to support through
            the belief that collecting NFT art is a fulfilling hobby!
          </p>
          <Link
            href="/mint"
            className=" text-center font-bold p-4 text-[15px] bg-[#DFFE00] rounded-lg mt-5 hover:scale-105"
          >
            <button>Buy Now</button>
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={"/assets/image/13back.png"}
            alt={"Logo"}
            width={270}
            height={270}
            className="mt-5"
          />
        </div>{" "}
      </div>
      <div className="p-4 sm:p-6 flex flex-col justify-center items-center border-[5px] border-[#DFFE00] mb-5 bg-white shadow-sm rounded-lg">
        <p className={` text-center font-bold text-3xl sm:text-3xl `}>About</p>
        <p
          className="text-center font-bold text-md sm:text-lg text-gray-700 mt-2
        "
        >
          CycGods is a digital NFT collection. There are 2,222 CycGods NFTs that
          are guaranteed to be unique. They are just like you; a beautiful work
          of art, and made with confidence. Each CycGods is completely unique
          and yours forever... unless you sell them... Baka.
        </p>
        <button className="p-3 sm:p-4 text-center font-bold text-[15px] bg-[#DFFE00] rounded-lg mt-4 sm:mt-5 hover:scale-105">
          Join Our Discord
        </button>
      </div>
    </>
  );
}
