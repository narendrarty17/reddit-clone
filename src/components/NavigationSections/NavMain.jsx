import React from "react";

import { Home, Popular, Explore, All } from "../svgComponents/NavMainSvgs";

const mainList = ["Home", "Popular", "Explore", "All"];

const componentMap = {
  Home: Home,
  Popular: Popular,
  Explore: Explore,
  All: All,
};

export default function NavMain() {
  const buttonList = mainList.map((mainItem) => {
    const iconName = mainItem;
    const Icon = componentMap[mainItem];

    return (
      <button
        key={iconName}
        className="flex items-center gap-6 px-4 py-2 
        rounded-xl justify-between focus:bg-midGray hover:bg-midDarkGray"
      >
        <div className="flex items-center gap-4 w-auto">
          <Icon />
          <span>{iconName}</span>
        </div>
      </button>
    );
  });

  return (
    <section className="flex flex-col gap-1 border-b-[1px] border-midGray py-4">
      {buttonList}
    </section>
  );
}
