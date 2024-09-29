import GroupHeader from "./GroupHomeUtils/GroupHeader.jsx";
import Post from "./Post.jsx";
import GroupSidebar from "./GroupSidebar.jsx";

export default function GroupHome({ name }) {
  return (
    <div className="flex flex-col gap-10">
      <GroupHeader />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
          <Post />
          <Post />
        </div>
        <GroupSidebar name="Dry Eyes" />
      </div>
    </div>
  );
}
