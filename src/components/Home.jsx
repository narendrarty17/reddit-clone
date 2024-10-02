import GroupPosts from "./GroupHomeUtils/GroupPosts";
import GroupSidebar from "./GroupHomeUtils/GroupSidebar";

export default function Home() {
  return (
    <div className="flex justify-between">
      <GroupPosts />
      <GroupSidebar name="Dry Eyes" />
    </div>
  );
}
