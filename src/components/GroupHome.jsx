import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import GroupHeader from "./GroupHomeUtils/GroupHeader.jsx";
import GroupSidebar from "./GroupHomeUtils/GroupSidebar.jsx";
import GroupPosts from "./GroupHomeUtils/GroupPosts.jsx";
import CreatePost from "./CreatePost.jsx";
import { Loading } from "./utils/Loading.jsx";

export default function GroupHome() {
  const { groupName } = useParams();
  const [createPost, setCreatePost] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleCreatePost = useCallback(() => {
    setCreatePost((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/community/${groupName}`
        );
        if (!response.ok) {
          throw new Error("Failed to getch group details");
        }
        const data = await response.json();
        setGroupDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGroupDetails();
  }, [groupName]);

  if (loading) return <Loading type="groupHome" />;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="w-full">
      {createPost ? (
        <CreatePost
          name={groupDetails.name}
          logo={groupDetails.iconImage}
          goToGroupHome={toggleCreatePost}
        />
      ) : (
        <div className="flex flex-col w-full gap-10">
          <GroupHeader
            name={groupDetails.name}
            googleId={groupDetails.googleId}
            logo={groupDetails.iconImage}
            banner={groupDetails.bannerImage}
            handleCreatePost={toggleCreatePost}
          />
          <div className="flex justify-between w-full gap-2">
            <GroupPosts name={groupDetails.name} />
            <GroupSidebar name={groupDetails.name} />
          </div>
        </div>
      )}
    </div>
  );
}
