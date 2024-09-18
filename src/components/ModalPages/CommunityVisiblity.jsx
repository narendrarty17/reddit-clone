import Mature from "../../assets/imgs/Modal/mature.svg";
import ModalTopSection from "./modalUtils/ModalTopSection";
import ModalButtons from "./modalUtils/ModalButtons";
import { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import { ItemCreationContext } from "../../context/ItemCreationContext";

const title = "What kind of community is this?";
const description =
  "Decide who can view and contribute in your community. Only public communities show up in search";
const categories = [
  {
    type: "public",
    description: "Anyone can view and contribute",
  },
  {
    type: "restricted",
    description: "Anyone can view, but only approved users can contribute",
  },
  {
    type: "private",
    description: "Only approved users can view and contribute",
  },
];

export default function CommunityVisibility() {
  const [visibility, setVisibility] = useState("public");
  const [isMature, setIsMature] = useState(false);

  const { submitPage, backPage, addCommunityData } =
    useContext(ItemCreationContext);

  const handleCategorySelection = (type) => {
    setVisibility(type);
  };

  const handleMatureSelection = () => {
    setIsMature((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit inside CommunityVisibility");
    addCommunityData({ visibility, isMature: isMature });
    submitPage();
  };

  const categoryList = categories.map((category) => {
    const icon = require(`../../assets/imgs/Modal/${category.type}.svg`);
    const name = category.type.charAt(0).toUpperCase() + category.type.slice(1);
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
          <img className="h-7" src={icon} alt={name} />
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
          <img className="h-7" src={Mature} alt="mature content" />
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
