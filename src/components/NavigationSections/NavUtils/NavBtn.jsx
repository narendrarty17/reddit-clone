import { useState } from "react";

import star from "../../../assets/imgs/Navigation/star.svg";

export default function NavButton({ iconName, icon, favIcon }) {
  const [favSelected, setFavSelected] = useState(false);
  const name = iconName.length > 14 ? iconName.slice(0, 13) + ".." : iconName;

  const handleFavSelect = function () {
    setFavSelected((prevState) => !prevState);
  };

  return (
    <button
      key={iconName}
      className="flex items-center gap-6 px-4 py-2 
        rounded-xl justify-between focus:bg-midGray hover:bg-midDarkGray"
    >
      <div className="flex items-center gap-4 w-auto">
        <img className="h-7 rounded-full" src={icon} alt={iconName} />
        {/* <span>{iconName.charAt(0).toUpperCase() + iconName.slice(1)}</span> */}
        <span>{name}</span>
      </div>
      {favIcon && (
        <div
          className={`${favSelected ? "bg-midDarkGray" : ""}`}
          onClick={handleFavSelect}
        >
          <img className="h-6" src={star} alt="favourite icon" />
        </div>
      )}
    </button>
  );
}
