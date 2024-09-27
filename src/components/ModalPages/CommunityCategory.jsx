import { useContext, useState } from "react";
import { ItemCreationContext } from "../../context/ItemCreationContext";
import SearchBar from "../utils/SearchBar";
import ModalButtons from "./modalUtils/ModalButtons";
import ModalTopSection from "./modalUtils/ModalTopSection";

const title = "Add topics";
const description =
  "Add up to 3 topics to help interested redditors find your community";
const searchPlaceholder = "Filter topics";
const topicsData = [
  {
    title: "Anime & Cosplay",
    items: ["Anime & Manga", "Cosplay"],
  },
  {
    title: "Art",
    items: [
      "Performing Arts",
      "Architecture",
      "Design",
      "Art",
      "Filmmaking",
      "Digital Art",
      "Photography",
    ],
  },
  {
    title: "Business & Finance",
    items: [
      "Personal Finance",
      "Crypto",
      "Economics",
      "Business News & Discussion",
      "Deals & Marketplace",
    ],
  },
];

export default function CommunityCategory() {
  const { communityData, backPage, submitPage, addCommunityData } =
    useContext(ItemCreationContext);
  const [topics, setTopics] = useState(communityData.selectedTopics ?? []);

  const handleTopicItemSelection = (item) => {
    setTopics((prevState) => {
      if (prevState.includes(item)) {
        // Remove item if already selected
        return prevState.filter((topic) => topic !== item);
      }
      // ensures not more than 3 items could be added
      if (prevState.length >= 3) {
        return prevState;
      }
      // Add item if not already selected
      return [...prevState, item];
    });
  };

  const topicsArray = topicsData.map((topic) => (
    <div key={topic.title} className="flex flex-col gap-2">
      <button className="flex justify-start bg-red-700 mr-auto px-3 py-2 rounded-3xl">
        {topic.title}
      </button>
      <ul className="flex flex-wrap gap-2 w-[100%]">
        {topic.items.map((item) => (
          <li
            key={item}
            className={`px-3 py-2 rounded-3xl cursor-pointer ${
              topics.includes(item) ? "bg-gray-500" : "bg-darkMidGray"
            } hover:bg-midGray`}
            onClick={() => handleTopicItemSelection(item)} // Handle click here
          >
            <button>{item}</button>
          </li>
        ))}
      </ul>
    </div>
  ));

  const handleNext = (e) => {
    e.preventDefault();
    addCommunityData({ selectedTopics: topics });
    submitPage();
  };

  return (
    <ModalTopSection title={title} description={description}>
      {/* Search item section */}
      <section className="mt-8 flex flex-col gap-2">
        <SearchBar placeholder={searchPlaceholder} />
        <span className="font-bold text-white text-xl">
          Topics {topics.length}/3
        </span>
      </section>

      {/* Topics Section */}
      <section className="flex flex-col items-start gap-4 mt-5 h-52 text-sm overflow-y-scroll text-white">
        {topicsArray}
      </section>
      <ModalButtons
        next={handleNext}
        back={backPage}
        isNextActive={topics.length === 3}
        btnNames={["Back", "Next"]}
      />
    </ModalTopSection>
  );
}
