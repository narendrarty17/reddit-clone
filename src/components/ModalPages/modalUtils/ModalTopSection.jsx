import close from "../../../assets/imgs/Modal/close.svg";
import { useContext } from "react";
import { ItemCreationContext } from "../../../context/ItemCreationContext";

export default function ModalTopSection({ title, description, children }) {
  const { handleCancel } = useContext(ItemCreationContext);
  return (
    <div className="relative flex flex-col gap-3 md:gap-6">
      <button className="absolute top-0 right-0" onClick={handleCancel}>
        <img className="h-7" src={close} alt="close" />
      </button>
      <div>
        <h3 className="text-white text-2xl font-bold">{title}</h3>
        <p className="text-veryLightGray hidden md:flex">{description}</p>
      </div>
      {children}
    </div>
  );
}
