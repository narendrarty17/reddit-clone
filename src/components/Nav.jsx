import NavCommunities from "./NavSections/NavCommunities";
import NavMain from "./NavSections/NavMain";

export default function Nav() {
  return (
    <nav className="hidden lg:flex flex-col w-[450px] border-r-[1px] border-midGray pl-3 pr-3">
      <NavMain />
      <NavCommunities />
    </nav>
  );
}
