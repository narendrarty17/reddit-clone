import ShowUserPosts from "./utils/ShowUserPosts";
import { useSelector } from "react-redux";

export default function Home() {
  const googleId = useSelector((state) => state.auth.googleId);
  return (
    <div className="w-[98%]">
      <div className="flex flex-col w-auto gap-10">
        <div className="flex justify-between gap-2 w-full">
          <ShowUserPosts googleId={googleId} />
        </div>
      </div>
    </div>
  );
}
