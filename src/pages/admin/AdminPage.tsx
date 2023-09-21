import DocumentHead from "@/components/Molecules/DocumentHead";
import { ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import React from "react";

const AdminPage = () => {
  return (
    <>
      <DocumentHead
        title="CycGods! - Admin Page"
        description="CycGods"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <section className="mb-8 mt-4">
        <h1 className={`  text-4xl font-bold text-gray-900 `}>Harvest</h1>
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <UserGroupIcon className="w-4 h-4" />
          </li>
          <li>
            <ChevronRightIcon className="w-3 h-3" />
          </li>
          <li className={` font-medium`}>Harvest</li>
        </ul>
      </section>
    </>
  );
};

export default AdminPage;
