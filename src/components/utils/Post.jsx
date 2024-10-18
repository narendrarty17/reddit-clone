import avatar from "../../assets/imgs/avatar.png";
import { UpDownVote, Comment, Badge, Share } from "./svgComponents/PostSvgs";
import { useState, useEffect, useRef } from "react";

export default function Post({ post, updateDeleteCount }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null); // Reference to the menu
  const dotsRef = useRef(null); // Reference to the dots

  const toggleMenu = () => {
    // Only toggle the menu if it wan't closed by an outside click
    setMenuVisible((prev) => !prev);
  };

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
    <div className="flex flex-col gap-1 flex-grow max-w-[800px] relative">
      <div className="flex flex-col gap-4 px-5 py-3 mx-1 md:mx-3 rounded-sm md:rounded-2xl hover:bg-lightMidGray">
        <div className="flex justify-between item-center">
          <section className="flex gap-3 items-center">
            <img className="w-7 rounded-full" src={avatar} alt="user icon" />
            <span className="text-white">r/{post.communityName}</span>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p>6 hr. ago</p>
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
        <h3 className="text-xl text-white">{post.title}</h3>
        {post.content.type === "text" && <p>{post.content.value}</p>}
        {post.content.type === "image" && (
          <div className="flex-grow md:w-[650px] bg-black flex items-center justify-center">
            <img
              src={post.content.value}
              alt="post img"
              className="object-contain w-auto h-[300px]"
            />
          </div>
        )}
        {post.content.type === "link" && <a href={post.content.value}>Post</a>}
        <section className="flex gap-3">
          <UpDownVote count="45" />
          <Comment count="11" />
          <Badge />
          <Share />
        </section>
      </div>
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
      {menuVisible && (
        <div
          ref={menuRef}
          className="absolute right-7 mt-8 w-24 bg-gray-700 rounded-md shadow-lg z-50"
        >
          <ul className="flex flex-col py-2">
            <li
              onClick={() => handleDeletePost(post._id)}
              className="px-4 py-1 hover:bg-gray-600 cursor-pointer"
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
