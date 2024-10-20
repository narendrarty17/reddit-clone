import React from "react";

const positionMap = {
  navIcons: "start",
  posts: "start",
  groupHome: "center",
  submitPost: "center",
  groupCreation: "start",
  home: "start",
  showUserPosts: "start",
};

const Error = ({ type, text = "Error occured..." }) => {
  const position = positionMap[type] || "center";

  return (
    <div
      className={`flex flex-col items-${position} justify-${position} bg-darkGray ml-4`}
    >
      <p className="mt-2 text-xl text-veryLightGray">{text}</p>
    </div>
  );
};

export { Error };
