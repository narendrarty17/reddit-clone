import { useContext, useEffect, useState } from "react";
import { ItemCreationContext } from "../../context/ItemCreationContext";

export default function FinalSummary() {
  const [data, setData] = useState({});
  const { communityData } = useContext(ItemCreationContext);

  useEffect(() => {
    setData(communityData);
    console.log(communityData); // To confirm data is being fetched correctly
  }, [communityData]);

  return (
    <>
      {data && (
        <ul className="text-white">
          <li>Name: {data.name || "Not provided"}</li>
          <li className="flex">
            SelectedTopics:&nbsp;
            {data.selectedTopics.map((topic) => (
              <p>{topic},&nbsp;</p>
            ))}
          </li>
          <li>Category: {data.visibility || "Not provided"}</li>
          <li>isMature: {data.isMature ? "Yes" : "No"}</li>
        </ul>
      )}
      <p>Hi</p>
    </>
  );
}
