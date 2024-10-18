import Post from "../utils/Post";
import { useEffect, useState } from "react";

import { Loading } from "../utils/Loading";

export default function GroupPosts({ name }) {
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
          `http://localhost:5000/post?page=${page}&communityName=${name}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPostsData(data);
      } catch (error) {
        console.error("Error message: ", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [name, page, deleteCount]);

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (isLoading) {
    return <Loading type="posts" />;
  }

  return (
    <div>
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
      <div className="flex flex-col ">
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
      <div className="flex justify-between">
        <button onClick={prevPg} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={nextPg} disabled={postsData?.totalPages <= page}>
          Next
        </button>
      </div>
    </div>
  );
}
