import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "@/hooks/useLocale";

export function Header() {
  const { t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const genericHamburgerLine =
    "h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300";
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener when the component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuList = [
    { name: t.COMP, link: "/comps" },
    {
      name: t.STATS,
      link: "/stats",
    },
    {
      name: t.RESOURCES,
      link: "/resources",
    },
  ];
  return (
    <header className="bg-red-300 p-4 mt-auto">
      <nav className="container flex justify-between items-center text-white mx-auto">
        <div className="text-3xl text-gray-900 hover:text-gray-600">
          <Link href="/">𝓞𝓾𝓬𝓱𝓲 𝓞𝓽𝓸𝓰𝓪𝓶𝓮</Link>
        </div>
        <div className="md:flex hidden flex-initial text-left space-x-10 font-bold text-gray-900">
          {menuList.map((menu) => {
            return (
              <Link
                key={menu.name}
                href={menu.link}
                className="hover:text-gray-600"
              >
                {menu.name}
              </Link>
            );
          })}
          <button onClick={() => signOut()} className="hover:text-gray-600">
            {t.SIGN_OUT}
          </button>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 border-2 border-black rounded flex flex-col justify-center items-center group md:hidden"
        >
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : ""}`}
          ></div>
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>
        <div
          ref={menuRef}
          className={
            isOpen
              ? "flex fixed z-10 top-0 right-0  min-h-fit min-w-full ease-linear duration-200"
              : "fixed right-[-100%] ease-linear duration-300"
          }
        >
          <div className="basis-1/2"></div>
          <div className="basis-1/2 bg-white">
            <ul className="text-center border-l-2">
              <li className="p-2 border-b-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800"
                >
                  {t.CLOSE}
                </button>
              </li>
              {menuList.map((menu) => (
                <li key={menu.name} className="p-2 border-b-2">
                  <Link
                    href={menu.link}
                    onClick={() => setIsOpen(false)}
                    className=" text-gray-800"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
              <li className="p-2 border-b-2">
                <button onClick={() => signOut()} className=" text-gray-800">
                  {t.SIGN_OUT}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
