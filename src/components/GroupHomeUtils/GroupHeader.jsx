import defaultBanner from "../../assets/imgs/Global/defaultBanner.svg";
import defaultLogo from "../../assets/imgs/Global/defaultLogo.svg";

import { useRef, useState, useEffect } from "react";

import { Notification } from "../svgComponents/GroupHomeSvgs";

export default function GroupHeader({ name, logo, banner, handleCreatePost }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuIconRef = useRef();
  const menuRef = useRef();

  const handleDeleteCommunity = async () => {
    const url = `http://localhost:5000/community/${name}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        alert(`${name} has been successfully deleted`);
        window.location.href = "http://localhost:3000"; // Redirect to home URL
      } else {
        alert(`Error in deleting ${name}`);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Function to handle clicks outside the menu
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuIconRef.current &&
      !menuIconRef.current.contains(event.target)
    ) {
      setMenuVisible(false); // Close the menu if clicked outside
    }
  };

  // Attach event listener to detect clicks outside the menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event
    };
  }, []);

  return (
    <div className="w-[100%] flex flex-col">
      <section className="md:pl-4 md:pr-1 md:py-2 w-[100%]">
        <img
          className="w-full h-20 md:h-24 md:rounded-lg"
          src={banner || defaultBanner}
          alt="community banner"
        />
        <div className="px-3 pt-3 md:px-6 md:pt-0 md:mt-[-40px] flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end">
          <div className="flex items-start gap-3 md:gap-4">
            <img
              className="h-12 w-12 md:h-24 md:w-24 rounded-full"
              src={logo || defaultLogo}
              alt="community logo"
            />
            <div className="mt-0 md:mt-[50px]  text-white font-bold">
              <h3 className="text-xl md:text-3xl">r/{name}</h3>
              <div className="flex md:hidden gap-3 items-center text-sm font-normal text-veryLightGray">
                <span>422k members</span>
                <span className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p>59 online</p>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={handleCreatePost}
              className="flex gap-2 px-2 py-1 items-center border-gray-400 border-[1px] rounded-3xl"
            >
              <span className="text-2xl">+</span>
              <p className="text-md">Create Post</p>
            </button>
            <div className="flex items-center justify-center border-[1px] border-gray-400 rounded-full p-2">
              <Notification />
            </div>
            <div className="flex gap-2 px-3 py-2 items-center border-gray-400 border-[1px] rounded-3xl">
              <p className="text-md">Joined</p>
            </div>
            <div
              ref={menuIconRef}
              onClick={toggleMenu}
              className="flex gap-1 px-2 py-4 rounded-full border-[1px] border-gay-400"
            >
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute self-end w-24 bg-gray-700 rounded-md shadow-lg z-50"
          style={{
            top: `${
              menuIconRef.current?.getBoundingClientRect().bottom +
              10 +
              window.scrollY
            }px`,
            left: `${
              menuIconRef.current?.getBoundingClientRect().right - 95
            }px`, // Using a constant for clarity
          }}
          role="menu" // Adding role for accessibility
          aria-hidden={!menuVisible} // Manage visibility for accessibility
        >
          <ul className="flex flex-col py-2">
            <li
              onClick={handleDeleteCommunity} // Use a function for clarity
              className="px-4 py-1 hover:bg-gray-600 cursor-pointer"
              role="menuitem" // Adding role for accessibility
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
