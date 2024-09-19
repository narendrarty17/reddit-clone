import downArrow from "../assets/imgs/Navigation/downArrow.svg";
import upArrow from "../assets/imgs/Navigation/upArrow.svg";
import CreateBtn from "./CreateBtn";
import ItemCreationModal from "./ItemCreationModal";
import NavBtn from "./NavBtn";

import { useRef, useState } from "react";

export default function NavSection({ items }) {
  const collapsable = items.name !== "main";
  const createBtnPresent = items.create === "true";
  const gap = items.name === "main" ? "1" : "0";

  const [isOpen, setIsOpen] = useState(!collapsable);
  const dialog = useRef();

  const toggleCollapse = () => setIsOpen((prevState) => !prevState);

  const buttonList = items.list.map((iconString) => {
    const iconName = `${items.name === "communities" ? "r/" : ""}${iconString
      .charAt(0)
      .toUpperCase()}${iconString.slice(1)}`;
    const icon = require(`../assets/imgs/Navigation/${items.name}/${iconString}.${items.extension}`);

    return (
      <NavBtn
        key={iconName}
        iconName={iconName}
        icon={icon}
        favIcon={items.name === "communities"}
      />
    );
  });

  const handleCreateItem = () => {
    // Open the dialog
    if (dialog.current) {
      dialog.current.open();
    }
  };

  return (
    <>
      {createBtnPresent && <ItemCreationModal ref={dialog} />}
      <section className="flex flex-col gap-1 border-b-[1px] border-midGray py-4">
        {collapsable && (
          <span className="flex justify-between items-center gap-6 px-4 py-2 ">
            <h3>{items.name.charAt(0).toUpperCase() + items.name.slice(1)}</h3>
            <img
              className="h-7"
              onClick={toggleCollapse}
              src={isOpen ? upArrow : downArrow}
              alt={`${items.name} ${isOpen ? "open" : "close"}`}
            />
          </span>
        )}
        {isOpen && createBtnPresent && (
          <CreateBtn createItem={items.name} onClick={handleCreateItem} />
        )}
        {isOpen && (
          <div className={`flex flex-col gap-${gap}`}>{buttonList}</div>
        )}
      </section>
    </>
  );
}
