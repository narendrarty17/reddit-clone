import { CreationAndVisibility } from "./CommunitySidebarUtils/SidebarSvgs";
import {
  NameAndDesc,
  MembersCount,
  Rules,
} from "./CommunitySidebarUtils/SidebarComponents";

export default function CommunitySidebar({ name = "Community Name" }) {
  return (
    <div className="hidden lg:flex flex-col gap-3 w-[500px] text-sm px-4 py-2 mx-4 bg-gray-950 rounded-2xl">
      <NameAndDesc />
      <CreationAndVisibility />
      <MembersCount />
      <div className="bg-gray-800 h-[1px] w-[100%]"></div>
      <Rules />
    </div>
  );
}
