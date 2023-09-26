import React from "react";
import DocumentHead from "@/components/Molecules/DocumentHead";
import { ChevronRightIcon, UserIcon } from "@heroicons/react/24/solid";

import { New_Rocker } from "next/font/google";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useAccount } from "wagmi";

const NewRocker = New_Rocker({ weight: "400", subsets: ["latin"] }); // Removed quotes around weight value

const Profile = () => {
  const { data: session, status }: any = useSession();

  return (
    <>
      <DocumentHead
        title="CycGods! - Profile"
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
          Profile Details
        </h1>
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <UserIcon className="w-4 h-4" />
          </li>
          <li>
            <ChevronRightIcon className="w-3 h-3" />
          </li>
          {session ? (
            <li className={`${NewRocker.className} font-medium`}>
              Profile {session && session.user.fullname}
            </li>
          ) : (
            <li className={`${NewRocker.className} font-medium`}>Profile</li>
          )}
        </ul>
      </section>

      <section className="bg-white p-4 rounded-lg shadow-md">
        <div className="text-center mb-4">
          {/* Tambahkan gambar profil di sini */}
          <div className="relative w-36 h-36 mx-auto">
            <Image
              src="/assets/Cyc/1.png"
              alt="Your Name"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User Name
            </label>
            <p className="mt-1 text-sm text-gray-600">
              {session ? session.user.fullname : ""}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <p className="mt-1 text-sm text-gray-600">
              {session ? session.user.id : ""}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-600">
              {session ? session.user.email : ""}
            </p>
          </div>
          {/* Tambahkan informasi profil lainnya di sini */}
        </div>
      </section>
    </>
  );
};

export default Profile;
