import downArrow from "../../assets/imgs/Navigation/downArrow.svg";
import upArrow from "../../assets/imgs/Navigation/upArrow.svg";
import CreateBtn from "./NavUtils/CreateBtn";
import CommunityCreationModal from "../CommunityCreationModal";
import NavBtn from "./NavUtils/NavBtn";

import { useEffect, useRef, useState } from "react";

export default function NavCommunities() {
  const [isOpen, setIsOpen] = useState(false);
  const [communityList, setCommunityList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dialog = useRef();

  const toggleCollapse = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading before the fetch
      try {
        const response = await fetch("http://localhost:5000/community/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCommunityList(data);
      } catch (error) {
        console.error("Error in fetching data: ", error);
        setErrorMessage(error.message); // Store the error message
      } finally {
        setIsLoading(false); // Stop loading in the finally block
      }
    };

    fetchData();
  }, []);

  const buttonList = communityList.map((community) => {
    const iconName = community.name;
    const icon = community.iconImage;

    return (
      <NavBtn
        key={iconName}
        iconName={iconName}
        icon={icon}
        favIcon={true} // later add the functionality
      />
    );
  });

  const handleCreateItem = () => {
    // Open the dialog
    if (dialog.current) {
      dialog.current.open();
    }
  };

  if (isLoading) {
    return <div className="flex justify-start p-4">Loading...</div>;
  }

  if (errorMessage && !isLoading) {
    return <div className="flex justify-start p-4">Can't fetch list</div>;
  }

  return (
    <>
      <CommunityCreationModal ref={dialog} />
      <section className="flex flex-col gap-1 border-b-[1px] border-midGray py-4">
        <span className="flex justify-between items-center gap-6 px-4 py-2 ">
          <h3>Communities</h3>
          <img
            className="h-7"
            onClick={toggleCollapse}
            src={isOpen ? upArrow : downArrow}
            alt={`Communities ${isOpen ? "open" : "close"}`}
          />
        </span>
        {isOpen && (
          <div className="flex flex-col gap-1">
            <CreateBtn createItem="community" onClick={handleCreateItem} />
            <div className="flex flex-col">{buttonList}</div>
          </div>
        )}
      </section>
    </>
  );
}
