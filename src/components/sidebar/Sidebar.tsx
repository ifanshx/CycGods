import { forwardRef } from "react";
import Link from "next/link";
import {
  HomeIcon,
  CreditCardIcon,
  UserIcon,
  BuildingLibraryIcon,
  RocketLaunchIcon,
  PhotoIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import Discord from "../@icon/Discord";
import Twitter from "../@icon/Twitter";

type Props = {
  showNav: boolean;
};

const MENU_ITEMS = [
  {
    name: "Home",
    icon: BuildingLibraryIcon,
    path: "/",
  },
  {
    name: "Mint",
    icon: RocketLaunchIcon,
    path: "/mint",
  },
  {
    name: "Harvest",
    icon: CurrencyDollarIcon,
    path: "/harvest",
  },
  {
    name: "Gallery",
    icon: PhotoIcon,
    path: "/gallery",
  },
  {
    name: "Profile",
    icon: UserIcon,
    path: "/profile",
  },
];

const ACTIVE_STYLING = "bg-black text-white";
const HOVER_STYLING = ACTIVE_STYLING.split(" ")
  .map((style) => `hover:${style}`)
  .join(" ");

const isActivePath = (path: string, currentPath: string) =>
  path === "/" ? currentPath === path : currentPath.includes(path);

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLElement, Props>(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <aside ref={ref} className={"fixed z-30 w-56 h-full bg-white  shadow-sm "}>
      <div className="flex justify-center m-5">
        <Image src={"/assets/Logo.png"} alt={"Logo"} width={120} height={120} />
      </div>

      <ul className={"flex flex-col gap-2"}>
        {MENU_ITEMS.map(({ name, icon: Icon, path }) => (
          <li key={name.toLowerCase().replace(" ", "-")}>
            <Link
              href={path}
              className={`pl-6 py-3  text-center cursor-pointer flex items-center gap-2 transition-colors ease-in-out duration-150 ${HOVER_STYLING} ${
                isActivePath(path, router.pathname)
                  ? ACTIVE_STYLING
                  : "text-gray-400 "
              }`}
            >
              <Icon className={"h-5 w-5"} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
});
