import Post from "./Post";
import { useEffect, useState } from "react";

import { Loading } from "./Loading";
import { Error } from "./Error";

export default function ShowUserPosts({ googleId }) {
  const [postsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteCount, setDeleteCount] = useState(0);

  const updateDeleteCount = () => {
    setDeleteCount((prev) => prev + 1);
  };

  const nextPg = () => {
    if (postsData?.totalPages > page) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPg = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/post/user?page=${page}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ googleId }), // Ensure you're sending the userEmail
          }
        );
        if (!response.ok) {
          if (response.status === 404) {
            console.log("No posts found for this user");
            setError("No posts are available");
          } else {
            setError("Network response was not ok");
          }
        }
        const data = await response.json(); // Fix: change `response.JSON()` to `response.json()`
        setPostsData(data);
      } catch (error) {
        console.error("Error message: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [page, deleteCount, googleId]);

  if (error) {
    return <Error type="showUserPosts" text={error} />;
  }

  if (isLoading) {
    return <Loading type="posts" />;
  }

  return (
    <div className="w-full">
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
      <div className="flex flex-col w-full">
        {postsData?.posts?.length > 0 ? (
          postsData.posts.map((post) => {
            return (
              <Post
                key={post._id}
                post={post}
                updateDeleteCount={updateDeleteCount}
              />
            );
          })
        ) : (
          <div>No posts available.</div> // Handle no posts case
        )}
      </div>
      {postsData?.totalPages > 1 && (
        <div className="flex justify-center items-center mt-10">
          <button
            className="cursor-pointer border-2 border-lightGray px-2 py-1"
            onClick={prevPg}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="w-10 flex justify-center">{page}</span>
          <button
            className="cursor-pointer border-2 border-lightGray px-2 py-1"
            onClick={nextPg}
            disabled={postsData?.totalPages <= page}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
