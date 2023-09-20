import React, { Fragment, useEffect, useRef, useState } from "react";
import DocumentHead from "@/components/Molecules/DocumentHead";
import {
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import data from "@/config/data.json";
import rarityData from "@/config/rarity.json";
import Discord from "@/components/@icon/Discord";

interface CategoryState {
  [key: string]: boolean;
}

const Gallery: React.FC = () => {
  const [items, setItems] = useState<any[]>([]); // You should specify a more specific type for 'items'
  const itemsPerPage = 20;
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [openCategory, setOpenCategory] = useState<CategoryState>({}); // Set the initial state to an empty object
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null); // You should specify a more specific type for 'selectedItem'
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [searchedItems, setSearchedItems] = useState<any[]>([]); // You should specify a more specific type for 'searchedItems'

  // Linked to search bar
  // Change 'CycGods' to your collection name
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log(`Search Query: CycGods #${query}`);

    // Update searchedItems based on the new search query
    const searched = data.filter((item) => {
      const pattern = new RegExp(`CycGods #${query}`);
      return pattern.test(item.name);
    });

    console.log(searched);
  };

  const handleCategoryClick = (category: string) => {
    setOpenCategory((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    })); // Toggle the state when clicked
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  };

  const handleScreenSize = () => {
    if (window.innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);

    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);

  useEffect(() => {
    // Set the 'items' state with the imported data
    setItems(data.slice(0, itemsPerPage));
  }, [itemsPerPage]);

  return (
    <>
      <DocumentHead
        title="CycGods! - Gallery"
        description="CycGods"
        baseUrl="https://cycgods.vercel.app/"
        favicon="/assets/Eyes.png"
        siteName="CycGods"
        image="/assets/Logo.png"
      />
      <section className="mb-8 mt-4">
        <h1 className="text-4xl font-bold text-gray-900 ">Gallery</h1>
        <ul className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <PhotoIcon className="w-4 h-4" />
          </li>
          <li>
            <ChevronRightIcon className="w-3 h-3" />
          </li>
          <li className="font-medium">Gallery</li>
        </ul>
      </section>
      {/* Search Bar */}
      <div className="flex p-2 border-2 border-black rounded-full flex-1 gap-x-4 self-stretch lg:gap-x-6 mb-3">
        <form className="flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            CycGods #
          </label>
          <div className="w-full flex flex-row items-center">
            <MagnifyingGlassIcon
              className="pointer-events-none inset-y-0 left-0 h-full w-6 text-gray-500"
              aria-hidden="true"
            />
            <input
              id="search-field"
              className="block h-full w-full border-0 bg-transparent py-0 pl-7 pr-0 text-black focus:ring-0 focus:ring-none focus:outline-none ring-none outline-none text-sm lg:text-lg"
              placeholder="CycGods #"
              type="search"
              name="search"
              onChange={handleSearch}
            />
            <div className="bg-gray-200 rounded-md m-1 px-2 py-1 font-semibold text-sm md:text-md lg:text-lg">
              ⌘K
            </div>
          </div>
        </form>
      </div>
      {/* filter */}
      <div className="px-15 py-3 ">
        <div className="flex flex-row items-center gap-x-3">
          <AdjustmentsHorizontalIcon
            onClick={() => setShowNav((prev) => !prev)}
            className="h-6 w-6 cursor-pointer text-gray-700 hover:text-[#DFFE00] transition-colors ease-in-out duration-300"
          />
          <button className="text-[10px] md:text-sm lg:text-sm rounded-md text-gray-400 text-left">
            Reset
          </button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center  bg-[#DFFE00] space-x-1 text-gray-600 text-[10px] md:text-sm lg:text-sm font-medium rounded-full border-2 border-black px-1 md:px-2 lg:px-2 py-0.5 md:py-1 lg:py-1">
              <span>Background: Yellow</span>
              <XMarkIcon className="w-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      {/* Filter */}
      <div className="flex flex-col md:flex-row px-0 md:px-15 space-x-0 md:space-x-4 space-y-2 md:space-y-0 ">
        <Transition
          as={Fragment}
          show={showNav}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <aside className="w-full md:w-[300px] h-full bg-[#DFFE00] rounded-lg shadow-sm flex flex-col">
            <ul className="flex flex-1 flex-col  ">
              {Object.entries(rarityData).map(([category, items]) => (
                <li key={category} className="bg-[#DFFE00] ">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className=" border border-b-gray-400 group flex gap-x-3 p-3 text-sm leading-6 font-semibold text-black hover:bg-gray-200 w-full"
                  >
                    <span className="h-6 w-6">
                      <PlusIcon
                        className={`h-6 w-6 transform transition-all duration-200 ${
                          openCategory[category] ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                    {category}
                  </button>
                  {openCategory[category] && (
                    <ul className=" pl-2 pr-2 space-y-1 bg-yellow-300">
                      {items.map((item) => (
                        <li key={item.trait}>
                          <button className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center hover:bg-gray-200 w-full">
                            <div className="flex flex-row w-full items-center justify-between focus:ring-0 focus:ring-none focus:outline-none ring-none outline-none">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                                />
                                <span className="pl-2">{item.trait}</span>
                              </div>
                              <span>{item.weight}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </Transition>
        <div className="p-4 flex border h-full border-black bg-white shadow-md rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item, index) => (
              <div className="cursor-pointer" key={index} onClick={openModal}>
                <div className="py-2 bg-[#DFFE00] rounded-2xl md:rounded-3xl lg:rounded-3xl">
                  <div className="overflow-hidden px-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="object-cover object-center bg-white rounded-2xl"
                    />
                  </div>
                  <div className="px-4">
                    <div className="flex flex-row justify-between items-start text-[10px] md:text-sm lg:text-sm text-black font-semibold pt-2 lg:pb-1">
                      <a
                        href={`https://www.tensor.trade/item/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-700 cursor-pointer"
                      >
                        {item.name}
                      </a>
                      <p className="font-medium">R: {item.edition}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex items-center justify-center z-[99]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed z-[99] inset-0 overflow-y-auto">
            <div className="flex items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="z-[99] mt-4 w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-row justify-between items-center pb-4">
                    <Dialog.Title
                      as="h3"
                      className="text-lg lg:text-xl font-medium leading-6 text-gray-900"
                    ></Dialog.Title>
                    <div className="flex flex-row">
                      <a
                        href={`https://www.tensor.trade/item/`}
                        className="flex flex-row text-gray-500 hover:opacity-80 ring:none outline:non focus:ring-none focus:outline-none pr-4 cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Discord className="w-5" />
                      </a>
                      <a
                        href={`https://magiceden.io/item-details/`}
                        className="flex flex-row text-gray-500 hover:opacity-80 ring:none outline:non focus:ring-none focus:outline-none pr-4 cursor-pointer"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Discord className="w-5" />
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-row items-stretch">
                    <div className="w-1/2">
                      <Image
                        src="/assets/Cyc/1.png"
                        alt="{name}"
                        width={300}
                        height={300}
                        className="w-full h-full rounded-2xl border-2 border-gray-200 shadow-sm"
                      />
                    </div>

                    <div className="w-1/2 flex flex-col">
                      <div className="flex flex-col h-full px-3">
                        <table className="w-full flex-grow">
                          <colgroup>
                            <col style={{ width: "50%" }} />
                            <col style={{ width: "50%" }} />
                          </colgroup>
                          <thead className="bg-white">
                            <tr>
                              <th
                                scope="col"
                                className="px-2 font-semibold text-gray-500 dark:text-white"
                              ></th>
                              <th
                                scope="col"
                                className="px-2 font-semibold text-gray-500 dark:text-white"
                              ></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-black text-center h-auto">
                              <td className="text-left whitespace-nowrap bg-gray-200 py-1 pl-4 rounded-l-2xl">
                                <p className="font-semibold text-xs lg:text-sm"></p>
                              </td>
                              <td className="whitespace-nowrap py-1 ring-1 ring-inset ring-gray-100 rounded-r-2xl">
                                <p className="font-semibold text-xs lg:text-sm"></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="relative inline-flex items-center justify-center text-gray-800 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-cyan-500/80 to-blue-500/80 group-hover:from-cyan-500/80 group-hover:to-blue-500/80 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200"
                      onClick={closeModal}
                    >
                      <span className="relative px-3 md:px-5 lg:px-5 py-1.5 md:py-2.5 lg:py-2.5 transition-all ease-in duration-200 bg-white rounded-md group-hover:bg-opacity-0">
                        Woah!
                      </span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Gallery;
