import searchIcon from "../../assets/imgs/searchIcon.svg";
export default function SearchBar({ placeholder }) {
  return (
    <div className="relative">
      <input
        className="rounded-3xl w-[100%] pl-14 h-10 bg-midGray"
        type="text"
        placeholder={placeholder}
      />
      <img
        className="absolute top-1/2 left-3 -translate-y-1/2 w-8 h-8"
        src={searchIcon}
        alt="Search icon"
      />
    </div>
  );
}
