import { useEffect, useState } from "react";
import { uploadPost } from "../services/uploadService";
import CreatePostHead from "./CreatePostUtils/CreatePostHead";
import CreatePostInput from "./CreatePostUtils/CreatePostInput";
import defaultLogo from "../assets/imgs/Global/defaultLogo.svg";

export default function CreatePost({
  name = "test group",
  logo = defaultLogo,
  goToGroupHome,
}) {
  const [postData, setPostData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission

  const handlePostData = async (data) => {
    setPostData({
      ...data,
      communityName: name,
    });
  };

  useEffect(() => {
    const sendPostData = async () => {
      console.log("Post data before sending to server: ", postData);
      if (!postData || isSubmitting) return; // Prevent multiple submissions

      setIsSubmitting(true); // Set flag to true to prevent duplicate

      if (postData) {
        try {
          const data = await uploadPost(postData); // Call the uploadPost function
          alert("Post successfully submitted");
          console.log("Post submitted successfully:", data);
        } catch (error) {
          console.error("Error submitting post:", error);
        } finally {
          setIsSubmitting(false);
          goToGroupHome();
        }
      }
    };

    sendPostData();
  }, [postData, isSubmitting, goToGroupHome]); // Run the effect when postData changes

  if (isSubmitting) {
    return <div className="text-white">Submitting your post...</div>;
  }

  return (
    <div className="flex flex-col gap-8 box-content max-w-[600px] px-10 py-8">
      <CreatePostHead name={name} logo={logo} />
      <CreatePostInput handlePostData={handlePostData} />
    </div>
  );
}
