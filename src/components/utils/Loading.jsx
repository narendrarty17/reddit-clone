import React from "react";

const positionMap = {
  navIcons: "start",
  posts: "start",
  groupHome: "center",
  submitPost: "center",
  groupCreation: "start",
};

const Loading = ({ type, text = "Loading..." }) => {
  const position = positionMap[type] || "center";

  return (
    <div
      className={`flex flex-col items-${position} justify-${position} h-screen bg-darkGray ml-4`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 border-t-2 border-transparent"></div>
      <p className="mt-4 text-xl text-veryLightGray">Loading...</p>
    </div>
  );
};

export { Loading };
