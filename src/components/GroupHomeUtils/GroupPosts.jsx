import Post from "../utils/Post";

export default function GroupPosts({ name }) {
  return (
    <div>
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
      <div className="flex flex-col ">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
