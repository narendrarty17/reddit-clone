import CreateBtn from "./NavUtils/CreateBtn";
import GroupCreation from "../GroupCreation";
import NavBtn from "./NavUtils/NavBtn";
import { Loading } from "../utils/Loading";

import { UpArrow, DownArrow } from "../svgComponents/NavCommunitySvgs";

import { useCallback, useEffect, useRef, useState } from "react";

export default function NavCommunities() {
  const [isOpen, setIsOpen] = useState(false);
  const [communityList, setCommunityList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newEntryCount, setNewEntryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dialog = useRef();

  const toggleCollapse = () => setIsOpen((prevState) => !prevState);
  const updateList = useCallback(
    () => setNewEntryCount((prev) => prev + 1),
    []
  );

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
  }, [newEntryCount]);

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
    return <Loading type="navIcons" />;
  }

  if (errorMessage && !isLoading) {
    return <div className="flex justify-start p-4">Can't fetch list</div>;
  }

  return (
    <>
      <GroupCreation ref={dialog} updateList={updateList} />
      <section className="flex flex-col gap-1 border-b-[1px] border-midGray py-4">
        <span className="flex justify-between items-center gap-6 px-4 py-2 ">
          <h3>Communities</h3>
          <button onClick={toggleCollapse}>
            {isOpen ? <UpArrow /> : <DownArrow />}
          </button>
        </span>
        {isOpen && (
          <div className="flex flex-col gap-1">
            <CreateBtn createItem="community" handleClick={handleCreateItem} />
            <div className="flex flex-col">{buttonList}</div>
          </div>
        )}
      </section>
    </>
  );
}
