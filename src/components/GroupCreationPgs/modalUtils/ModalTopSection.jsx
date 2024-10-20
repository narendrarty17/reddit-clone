import { Close } from "../../utils/svgComponents/GroupCreationSvgs";
import { useContext } from "react";
import { GroupCreationContext } from "../../../context/GroupCreationContext";

export default function ModalTopSection({ title, description, children }) {
  const { handleCancel } = useContext(GroupCreationContext);
  return (
    <div className="relative flex flex-col gap-3 md:gap-6">
      <button className="absolute top-0 right-0" onClick={handleCancel}>
        <Close />
      </button>
      <div>
        <h3 className="text-white text-2xl font-bold">{title}</h3>
        <p className="text-veryLightGray hidden md:flex">{description}</p>
      </div>
      {children}
    </div>
  );
}
