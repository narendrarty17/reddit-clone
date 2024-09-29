import { Search } from "../svgComponents/GloalSvgs";
export default function SearchBar({ placeholder }) {
  return (
    <div className="relative">
      <input
        className="rounded-3xl w-[100%] pl-14 h-10 bg-midGray"
        type="text"
        placeholder={placeholder}
      />
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <Search />
      </div>
    </div>
  );
}
