import { useEffect, useState } from "react";
import { uploadPost } from "../services/uploadService";
import CreatePostHead from "./CreatePostUtils/CreatePostHead";
import CreatePostInput from "./CreatePostUtils/CreatePostInput";
import defaultLogo from "../assets/imgs/Global/defaultLogo.svg";
import { createPortal } from "react-dom";
import { Loading } from "./utils/Loading";

import { useSelector } from "react-redux";

export default function CreatePost({
  name = "test group",
  logo = defaultLogo,
  goToGroupHome,
}) {
  const [postData, setPostData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track submission
  const googleId = useSelector((state) => state.auth.googleId);

  const handlePostData = async (data) => {
    setPostData({
      ...data,
      communityName: name,
      googleId,
    });
  };

  useEffect(() => {
    const sendPostData = async () => {
      console.log("Post data before sending to server: ", postData);
      if (!postData || isSubmitting) return; // Prevent multiple submissions

      setIsSubmitting(true); // Set flag to true to prevent duplicate submissions

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

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-4 z-10">
      <div className="flex flex-col gap-8 bg-white bg-opacity-10 rounded-2xl shadow-lg max-w-xl w-full px-6 py-6">
        {" "}
        {/* Added border and bg-opacity */}
        {isSubmitting ? (
          <Loading type="submitPost" text="Submitting your post..." />
        ) : (
          <div>
            <CreatePostHead name={name} logo={logo} close={goToGroupHome} />
            <CreatePostInput handlePostData={handlePostData} />
          </div>
        )}
      </div>
    </div>,
    document.getElementById("modal")
  );
}
