import data from "../assets/data/navigation.json";
import NavSection from "./NavigationUtils/NavSection";

const navSections = data.map((item) => (
  <NavSection key={item.name} items={item} />
));

export default function Navigation() {
  return (
    <nav className="hidden lg:flex flex-col w-[450px] border-r-[1px] border-midGray pl-3 pr-3">
      {navSections}
    </nav>
  );
}
