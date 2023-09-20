import { Fragment, ReactNode, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { TopBar } from "../TopBar";
import { Sidebar } from "../Sidebar";

type Props = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: Props) => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleScreenSize = () => {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      addEventListener("resize", handleScreenSize);
    }

    return () => {
      removeEventListener("resize", handleScreenSize);
    };
  }, []);

  return (
    <>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter={"transform transition duration-[400ms]"}
        enterFrom={"-translate-x-full"}
        enterTo={"translate-x-0"}
        leave={"transform duration-[400ms] transition ease-in-out"}
        leaveFrom={"translate-x-0"}
        leaveTo={"-translate-x-full"}
      >
        <Sidebar showNav={showNav} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className={"px-3 md:px-6"}>{children}</div>
      </main>
    </>
  );
};
