import {
  Public,
  Restricted,
  Private,
  Mature,
} from "../svgComponents/GroupCreationSvgs";
import ModalTopSection from "./modalUtils/ModalTopSection";
import ModalButtons from "./modalUtils/ModalButtons";
import { useContext, useEffect, useState } from "react";
import { GroupCreationContext } from "../../context/GroupCreationContext";

const componentMap = {
  Public: Public,
  Restricted: Restricted,
  Private: Private,
};

const title = "What kind of community is this?";
const description =
  "Decide who can view and contribute in your community. Only public communities show up in search";
const categories = [
  {
    type: "Public",
    description: "Anyone can view and contribute",
  },
  {
    type: "Restricted",
    description: "Anyone can view, but only approved users can contribute",
  },
  {
    type: "Private",
    description: "Only approved users can view and contribute",
  },
];

export default function GrouopVisibility() {
  const { communityData, submitPage, backPage, addCommunityData } =
    useContext(GroupCreationContext);

  const [visibility, setVisibility] = useState(
    communityData.visibility ?? "Public"
  );
  const [isMature, setIsMature] = useState(communityData.isMature ?? false);

  const handleCategorySelection = (type) => {
    setVisibility(type);
  };

  const handleMatureSelection = () => {
    setIsMature((prevState) => !prevState);
  };

  useEffect(() => {
    addCommunityData({ visibility, isMature });
  }, [visibility, isMature, addCommunityData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCommunityData({ visibility, isMature });
    submitPage();
  };

  const categoryList = categories.map((category) => {
    const Icon = componentMap[category.type];
    const name = category.type;
    const description = category.description;

    return (
      <button
        key={category.type}
        className={`flex justify-between items-center px-4 py-2 rounded-lg ${
          visibility === category.type ? "bg-gray-500" : "bg-darkMidGray"
        }`}
        onClick={() => handleCategorySelection(category.type)}
      >
        <div className="flex gap-4 items-center">
          <Icon />
          <div className="flex flex-col items-start">
            <span className="text-white text-md">{name}</span>
            <p className="text-lightGray text-sm">{description}</p>
          </div>
        </div>
        <input
          className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:bg-lightGray cursor-pointer"
          type="checkbox"
          readOnly
          checked={visibility === category.type}
          onChange={() => {
            handleCategorySelection(category.type);
          }}
        />
      </button>
    );
  });

  return (
    <ModalTopSection title={title} description={description}>
      <section className="flex flex-col gap-4">{categoryList}</section>

      <button
        className="flex justify-between items-center px-4 py-2 rounded-lg bg-darkMidGray hover:bg-midGray"
        onClick={handleMatureSelection}
      >
        <div className="flex gap-4 items-center">
          <Mature />
          <div className="flex flex-col items-start">
            <span className="text-white text-md">Mature (18+)</span>
            <p className="text-lightGray text-sm">
              Users must be over 18 to view and contribute
            </p>
          </div>
        </div>
        <input
          className="appearance-none w-5 h-5 border-2 border-gray-500 rounded-full checked:bg-lightGray cursor-pointer"
          type="checkbox"
          checked={isMature}
          onChange={() => {}}
        />
      </button>

      <ModalButtons
        next={handleSubmit}
        back={backPage}
        isNextActive={visibility}
        btnNames={["Back", "Submit"]}
      />
    </ModalTopSection>
  );
}
