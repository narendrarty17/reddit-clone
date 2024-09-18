import redditLogo from "../../assets/imgs/Header/01_reddit_logo.svg";
import chatIcon from "../../assets/imgs/Header/03_chat_icon.svg";
import createIcon from "../../assets/imgs/create.svg";
import notificationIcon from "../../assets/imgs/Header/05_notification.svg";
import avatar from "../../assets/imgs/Header/06_avatar.png";
import SearchBar from "./SearchBar";

const iconStyle = "h-6 hover:bg-midGray px-2 py-2 box-content rounded-full";

export default function Header() {
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
        <img className={iconStyle} src={chatIcon} alt="chat icon" />
        <button className="flex gap-2 text-lightGray font-semibold hover:bg-midGray px-3 py-2 rounded-3xl">
          <img className="h-6" src={createIcon} alt="chat icon" />
          <span>Create</span>
        </button>
        <img className={iconStyle} src={notificationIcon} alt="create icon" />
        <img
          className="w-8 h-8 hover:bg-midGray px-2 py-2 box-content rounded-full"
          src={avatar}
          alt="create icon"
        />
      </div>
    </header>
  );
}
