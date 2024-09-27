import CommunityHeader from "./CommunityHomeUtils/CommunityHeader";
import Post from "./Post";
import CommunitySidebar from "./CommunitySidebar.jsx";

export default function CommunityHome({ name }) {
  return (
    <div className="flex flex-col gap-10">
      <CommunityHeader />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
          <Post />
          <Post />
        </div>
        <CommunitySidebar name="Dry Eyes" />
      </div>
    </div>
  );
}
