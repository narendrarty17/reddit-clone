import NavCommunities from "./NavigationSections/NavCommunities";
import NavMain from "./NavigationSections/NavMain";

export default function Navigation() {
  return (
    <nav className="hidden lg:flex flex-col w-[450px] border-r-[1px] border-midGray pl-3 pr-3">
      <NavMain />
      <NavCommunities />
    </nav>
  );
}
