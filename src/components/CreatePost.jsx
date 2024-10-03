import { useEffect, useState } from "react";

import CreatePostHead from "./CreatePostUtils/CreatePostHead";
import CreatePostInput from "./CreatePostUtils/CreatePostInput";

export default function CreatePost({ groupName = "test group", groupLogo }) {
  const [postData, setPostData] = useState(null);

  const handlePostData = (data) => {
    setPostData({
      ...data,
      groupName,
    });
  };

  useEffect(() => {
    console.log("Post data: ", postData);
  }, [postData]);

  return (
    <div className="flex flex-col gap-8 box-content max-w-[600px] px-10 py-8">
      <CreatePostHead name={groupName} logo={groupLogo} />
      <CreatePostInput handlePostData={handlePostData} />
    </div>
  );
}
