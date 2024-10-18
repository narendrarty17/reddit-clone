import redditLogo from "../assets/imgs/Header/reddit.svg";
import avatar from "../assets/imgs/avatar.png";

import { ChatIcon, Notification } from "./utils/svgComponents/HeaderSvgs";
import { Create } from "./utils/svgComponents/GloalSvgs";
import { Button } from "./utils/Button";
import SearchBar from "./utils/SearchBar";
import Login from "./Login";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

import { useCallback, useState } from "react";

export default function Header() {
  const [closeModal, setCloseModal] = useState();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const photoURL = useSelector((state) => state.auth.photoURL);

  const toggleModal = useCallback(() => {
    setCloseModal((prev) => !prev);
  }, []);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className="flex p-3 w-[100%] justify-between items-center box-border border-b-[1px] border-midGray">
      {/* Left section */}
      <div className="flex flex-row items-center gap-3 h-10 w-[10%]">
        <div className="md:hidden flex flex-col items-center space-y-[7px] w-9 px-5 py-3 hover:bg-midGray rounded-full">
          <div className="w-6 h-[2px] bg-lightGray"></div>
          <div className="w-6 h-[2px] bg-lightGray"></div>
          <div className="w-6 h-[2px] bg-lightGray"></div>
        </div>
        <img className="w-10 h-10" src={redditLogo} alt="reddit logo" />
        <span className="hidden md:flex font-bold text-2xl">reddit</span>
      </div>

      {/* Mid or Search section */}
      <div className="w-[60%] md:w-[40%]">
        <SearchBar placeholder="Search reddit" />
      </div>

      {/* Right section */}
      <div className="hidden md:flex gap-1 items-center">
        {email ? (
          <div className="hidden md:flex gap-1 items-center">
            <ChatIcon />
            <button className="flex gap-2 text-lightGray font-semibold hover:bg-midGray px-3 py-2 rounded-3xl">
              <Create />
              <span>Create</span>
            </button>
            <Notification />
            <img
              className="w-8 h-8 hover:bg-midGray px-2 py-2 box-content rounded-full"
              src={photoURL || avatar}
              alt="create icon"
            />
            <Button text="Logout" handleClick={handleLogout} bgColor="red" />
          </div>
        ) : (
          <Button text="Log In" handleClick={toggleModal} bgColor="red" />
        )}
      </div>
      {closeModal && <Login handleClose={toggleModal} />}
    </header>
  );
}
