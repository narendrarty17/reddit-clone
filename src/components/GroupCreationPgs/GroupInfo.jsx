import { useState, useContext } from "react";
import { GroupCreationContext } from "../../context/GroupCreationContext";
import ModalTopSection from "./modalUtils/ModalTopSection";
import GroupDetail from "./modalUtils/GroupDetail";
import ModalButtons from "./modalUtils/ModalButtons";

const title = "Tell us about your community";
const description =
  "A name and description help people understand what your community is all about";

export default function GroupInfo() {
  const [error, setError] = useState(null);
  const { communityData } = useContext(GroupCreationContext);
  const [name, setName] = useState(communityData.name || "");
  const [desc, setDesc] = useState(communityData.description || "");
  const [iconImageUrl] = useState(
    communityData.iconImage
      ? URL.createObjectURL(communityData.iconImage)
      : null
  );
  const [bannerImageUrl] = useState(
    communityData.bannerImage
      ? URL.createObjectURL(communityData.bannerImage)
      : null
  );

  const { submitPage, handleCancel, addCommunityData } =
    useContext(GroupCreationContext);

  const handleNext = (e) => {
    e.preventDefault();

    if (formValid) {
      //   onReset(communityName.current.value, communityDesc.current.value);
      addCommunityData({ name: name, description: desc });
      submitPage();
    } else {
      setError("Both fields should be filled");
      setTimeout(() => {
        setError(undefined);
      }, 5000);
    }
  };

  // const formValid = name.trim() !== "" && desc.trim() !== "";
  const formValid = name && desc;
  return (
    <>
      <ModalTopSection title={title} description={description}>
        <section className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col gap-4 md:gap-8 w-auto md:w-96 order-2 md:order-1 text-white">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl h-14 p-4 outline-none bg-darkMidGray hover:bg-midGray"
              type="text"
              placeholder="Community name* upto 18 characters"
              maxLength="18"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="rounded-2xl h-40 p-4 md:w-auto outline-none bg-darkMidGray hover:bg-midGray"
              placeholder="Descripton*"
              maxLength="200"
            />
          </div>
          <GroupDetail
            name={name}
            description={desc}
            banner={bannerImageUrl}
            logo={iconImageUrl}
          />
        </section>
        <ModalButtons
          next={handleNext}
          back={handleCancel}
          isNextActive={formValid}
          btnNames={["Cancel", "Next"]}
        />
      </ModalTopSection>
      {error && <div className="text-red-400 font-semibold">*{error}</div>}
    </>
  );
}
