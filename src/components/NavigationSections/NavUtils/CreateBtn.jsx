import { Create } from "../../svgComponents/GloalSvgs";

export default function CreateBtn({ createItem, onClick }) {
  return (
    <button
      className="flex items-center gap-6 px-4 py-2 
        rounded-xl justify-between focus:bg-midGray hover:bg-midDarkGray"
      onClick={onClick}
    >
      <div className="flex items-center gap-4 w-auto">
        <Create />
        {/* <span>{iconName.charAt(0).toUpperCase() + iconName.slice(1)}</span> */}
        <span>
          Create a {createItem === "community" ? "community" : "feed"}
        </span>
      </div>
    </button>
  );
}
