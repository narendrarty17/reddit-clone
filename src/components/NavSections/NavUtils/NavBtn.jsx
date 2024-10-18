import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Star } from "../../utils/svgComponents/NavBtnSvgs";

export default function NavButton({ iconName, icon, favIcon }) {
  const [favSelected, setFavSelected] = useState(false);
  const name = iconName.length > 14 ? iconName.slice(0, 13) + ".." : iconName;

  const navigate = useNavigate();

  const handleFavSelect = function () {
    setFavSelected((prevState) => !prevState);
  };

  return (
    <button
      key={iconName}
      onClick={() => navigate(`/groupHome/${name}`)}
      className="flex items-center gap-6 px-2 py-2 w-[95%] box-content
        rounded-xl justify-between focus:bg-midGray hover:bg-midDarkGray"
    >
      <div className="flex items-center gap-4 w-auto">
        <img className="w-7 h-7 rounded-full" src={icon} alt={iconName} />
        {/* <span>{iconName.charAt(0).toUpperCase() + iconName.slice(1)}</span> */}
        <span>{name}</span>
      </div>
      {favIcon && (
        <div
          className={`${favSelected ? "bg-midDarkGray" : ""}`}
          onClick={handleFavSelect}
        >
          <Star />
        </div>
      )}
    </button>
  );
}
