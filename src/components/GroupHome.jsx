import GroupHeader from "./GroupHomeUtils/GroupHeader.jsx";
import GroupSidebar from "./GroupHomeUtils/GroupSidebar.jsx";
import GroupPosts from "./GroupHomeUtils/GroupPosts.jsx";

export default function GroupHome({ name }) {
  return (
    <div className="flex flex-col w-auto gap-10">
      <GroupHeader />
      <div className="flex justify-between">
        <GroupPosts />
        <GroupSidebar name="Dry Eyes" />
      </div>
    </div>
  );
}
