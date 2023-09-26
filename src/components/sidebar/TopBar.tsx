import { Dispatch, Fragment, SetStateAction } from "react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  CogIcon,
  UserIcon,
  WalletIcon,
} from "@heroicons/react/24/solid";
import { Menu, Popover, Transition } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";

type Props = {
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
};

export const TopBar = ({ showNav, setShowNav }: Props) => {
  const { data: session, status }: any = useSession();
  const { disconnect } = useDisconnect();

  return (
    <section
      className={`fixed z-30 w-full h-16 flex items-center transition-all duration-400 ${
        showNav ? "pl-[224px]" : ""
      }`}
    >
      <ul className="bg-white flex h-full justify-between items-center flex-1 px-4 md:px-13">
        <li>
          <Bars3CenterLeftIcon
            className="h-8 w-8 cursor-pointer text-gray-700 hover:text-orange-500 transition-colors ease-in-out duration-300"
            onClick={() => setShowNav((prev) => !prev)}
          />
        </li>
        <li className="flex items-center gap-5 md:gap-8">
          <Menu as="div" className="relative inline-block text-left">
            {session ? (
              <div className="flex items-center gap-5 md:gap-8">
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex w-full justify-center items-center gap-2">
                    {session?.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt={session.user.fullname}
                        className="w-10 h-10 rounded-full mr-1 border-2 border-white shadow-sm"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src="/assets/Cyc/1.png"
                        alt={session.user.fullname}
                        className="w-10 h-10 rounded-full mr-1 border-2 border-white shadow-sm"
                      />
                    )}

                    <span className="hidden md:block font-medium text-gray-700">
                      {session.user.fullname ??
                        session.user.id.slice(0, 4) +
                          "..." +
                          session.user.id.slice(session.user.id.length - 4)}
                    </span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-700" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform scale-95"
                    enterTo="transform scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform scale-100"
                    leaveTo="transform scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white shadow-sm rounded p-4">
                      <Menu.Item>
                        <Link
                          href="/profile"
                          className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm transition-colors ease-in-out duration-300 items-center gap-2"
                        >
                          <UserIcon className="w-4 h-4" />
                          Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/wallet"
                          className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm transition-colors ease-in-out duration-300 items-center gap-2"
                        >
                          <WalletIcon className="w-4 h-4" />
                          Wallet
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          href="/setting"
                          className="flex hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm transition-colors ease-in-out duration-300 items-center gap-2"
                        >
                          <CogIcon className="w-4 h-4" />
                          Setting
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            disconnect();
                            signOut();
                          }}
                          className="flex hover:bg-orange-500 w-full hover:text-white text-gray-700 rounded p-2 text-sm transition-colors ease-in-out duration-300 items-center gap-2"
                        >
                          <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                          Sign Out
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <button
                className="rounded text-center flex items-center bg-white h-12 shadow-sm p-5"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
          </Menu>
        </li>
      </ul>
    </section>
  );
};
