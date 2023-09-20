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
  WalletIcon,
  ChartBarIcon,
  PencilIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import Image from "next/image";

type Props = {
  showNav: boolean;
};

const MENU_ITEMS = [
  {
    category: "CycGods Place",
    items: [
      {
        name: "Dashboard",
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
    ],
  },
  {
    category: "My Account",
    items: [
      {
        name: "Profile",
        icon: UserIcon,
        path: "/profile",
      },
      {
        name: "Wallet",
        icon: WalletIcon,
        path: "/wallet",
      },
      {
        name: "Setting",
        icon: CogIcon,
        path: "/setting",
      },
    ],
  },
];

const ACTIVE_STYLING = "bg-black text-white";
const HOVER_STYLING = "hover:bg-gray-200 hover:text-black";
const CATEGORY_TITLE_STYLING = "text-gray-500 pl-1 py-2 mb-1";

const isActivePath = (path: string, currentPath: string) =>
  path === "/" ? currentPath === path : currentPath.includes(path);

// eslint-disable-next-line react/display-name
export const Sidebar = forwardRef<HTMLElement, Props>(({ showNav }, ref) => {
  const router = useRouter();

  return (
    <aside ref={ref} className="fixed z-30 w-56 h-full bg-white shadow-sm p-4">
      <div className="flex justify-center mb-5">
        <Image src="/assets/Logo.png" alt="Logo" width={120} height={120} />
      </div>

      <ul className="space-y-3">
        {MENU_ITEMS.map((category) => (
          <li key={category.category}>
            <div className={CATEGORY_TITLE_STYLING}>{category.category}</div>
            <ul>
              {category.items.map(({ name, icon: Icon, path }) => (
                <li key={name.toLowerCase().replace(" ", "-")}>
                  <Link
                    href={path}
                    className={`block pl-4 py-2 cursor-pointer flex items-center gap-2 transition-colors ease-in-out duration-150 ${HOVER_STYLING} ${
                      isActivePath(path, router.pathname)
                        ? ACTIVE_STYLING
                        : "text-gray-600"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
});
