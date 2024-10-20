import avatar from "../../assets/imgs/avatar.png";
import { UpDownVote, Comment, Badge, Share } from "./svgComponents/PostSvgs";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

export default function Post({ post, updateDeleteCount }) {
  const [postData, setPostData] = useState(post);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null); // Reference to the menu
  const dotsRef = useRef(null); // Reference to the dots
  const loggedUserGoogleId = useSelector((state) => state.auth.googleId);
  const isAuthorized = post.googleId === loggedUserGoogleId;

  // const updateVote = useCallback(
  //   async (type, action) => {
  //     const updatedPost = await handleVote(post._id, type, action);
  //     if (updatedPost) {
  //       setPostData(updatedPost);
  //     }
  //   },
  //   [post._id]
  // );

  useEffect(() => {
    console.log("Incoming post data: ", post); // Debug log
    setPostData(post);
  }, [post]);

  console.log("upvote: ", post.upvote);
  console.log("downvote: ", post.downvote);

  const toggleMenu = () => {
    // Only toggle the menu if it wan't closed by an outside click
    setMenuVisible((prev) => !prev);
  };

  // const handleVote = async (postId, type, action) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/post/${postId}/vote?type=${type}&action=${action}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (!response.ok) {
  //       console.log("Error in updating the vote count");
  //       return false;
  //     }
  //     const updatedPost = await response.json();
  //     return updatedPost;
  //   } catch (error) {
  //     console.error("Error occurred: ", error);
  //     return false;
  //   }
  // };

  // Function to handle clicks outside the menu
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      dotsRef.current &&
      !dotsRef.current.contains(event.target)
    ) {
      setMenuVisible(false); // Close the menu if clicked outside
    }
  };

  const handleDeletePost = async (id) => {
    const url = `http://localhost:5000/post/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        alert("Post deleted successfully");
        console.log("Post deleted successfully: ", result);
        updateDeleteCount();
      } else {
        alert("Fail to delete the post");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Attach event listener to detect clicks outside the menu
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event
    };
  }, []);

  return (
    <div className="flex flex-col gap-1 flex-grow w-full items-start relative">
      <div className="flex flex-col gap-4 w-full px-3 md:px-5 py-3 md:mx-3 rounded-sm md:rounded-2xl hover:bg-lightMidGray">
        <div className="flex w-full justify-between item-center">
          <section className="flex gap-3 items-center">
            <img className="w-7 rounded-full" src={avatar} alt="user icon" />
            <span className="text-white">r/{postData.communityName}</span>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p>6 hr. ago</p> {/* Consider updating this with actual time */}
            </div>
          </section>
          <div
            ref={dotsRef}
            onClick={toggleMenu}
            className="flex gap-[2px] mt-1"
          >
            <div className="w-[4px] h-[4px] rounded-full bg-veryLightGray"></div>
            <div className="w-[4px] h-[4px] rounded-full bg-veryLightGray"></div>
            <div className="w-[4px] h-[4px] rounded-full bg-veryLightGray"></div>
          </div>
        </div>
        <h3 className="text-xl text-white w-full">{post.title}</h3>
        {postData.content && postData.content.type === "text" && (
          <p>{postData.content.value}</p>
        )}
        {postData.content && postData.content.type === "image" && (
          <div className="flex-grow w-full bg-black flex items-center justify-center">
            <img
              src={postData.content.value}
              alt="post img"
              className="object-contain w-auto max-h-[350px] 2xl:max-h-[500px]"
            />
          </div>
        )}
        {postData.content && postData.content.type === "link" && (
          <a href={postData.content.value} className="text-blue-500 underline">
            Post
          </a>
        )}
        <section className="flex gap-3">
          {/* <UpDownVote
            updateVote={updateVote}
            count={postData.upvote - postData.downvote}
          /> */}
          <Comment count="11" />
          <Badge />
          <Share />
        </section>
      </div>
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute right-2 mt-8 w-24 bg-gray-700 rounded-md shadow-lg z-50"
        >
          <ul className="flex flex-col py-2">
            {isAuthorized && (
              <li
                onClick={() => handleDeletePost(postData._id)}
                className="px-4 py-1 hover:bg-gray-600 cursor-pointer"
              >
                Delete
              </li>
            )}
            <li
              onClick={() => {}}
              className="px-4 py-1 hover:bg-gray-600 cursor-pointer"
            >
              Save
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
