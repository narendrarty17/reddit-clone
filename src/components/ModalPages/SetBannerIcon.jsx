import ModalTopSection from "./modalUtils/ModalTopSection";
import imageIcon from "../../assets/imgs/Modal/image.svg";
import deleteIcon from "../../assets/imgs/Modal/delete.svg";
import CommunityDetail from "./modalUtils/CommunityDetail";
import { useContext, useEffect, useState } from "react";
import { ItemCreationContext } from "../../context/ItemCreationContext";
import ModalButtons from "./modalUtils/ModalButtons";

const title = "Style your community";
const description =
  "Adding visual flair will catch new members attention and help establish your community's culture!<br /> You can update this at any time";

export default function SetBannerIcon() {
  const { communityData, submitPage, addCommunityData, backPage } =
    useContext(ItemCreationContext);
  const [bannerImage, setBannerImage] = useState(
    communityData.bannerImage ?? null
  );
  const [bannerImageUrl, setBannerImageUrl] = useState(
    communityData.bannerImage
      ? URL.createObjectURL(communityData.bannerImage)
      : null
  );
  const [iconImage, setIconImage] = useState(communityData.iconImage ?? null);
  const [iconImageUrl, setIconImageUrl] = useState(
    communityData.bannerImage
      ? URL.createObjectURL(communityData.iconImage)
      : null
  );
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setName(communityData.name);
    setDesc(communityData.description);
  }, [communityData]);

  const handleFileChange = (event, setter, setterUrl) => {
    const file = event.target.files[0];
    if (file) {
      // For demonstration purposes, storing the file object itself
      // In a real application, you might want to upload it or process it further
      setter(file);
      setterUrl(URL.createObjectURL(file));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    // check if imgs are submitted or not then
    addCommunityData({ bannerImage, iconImage });
    submitPage();
  };

  const deleteImgs = (setter, setterUrl) => {
    setter(null);
    setterUrl(null);
  };

  const imgsUploaded = bannerImage && iconImage;

  return (
    <ModalTopSection title={title} description={description}>
      <div className="flex flex-wrap justify-start md:justify-between gap-4 py-0 md:pt-2">
        <section className="flex flex-col gap-4 order-2 md:order-1 w-[90%] md:w-[50%] text-white pl-4">
          <div className="flex justify-between  items-center">
            <p className="w-12">Banner</p>
            {bannerImageUrl && (
              <div className="flex gap-2 items-center">
                <img
                  src={bannerImageUrl}
                  alt="Banner preview"
                  className="w-10 h-10 object-cover"
                />
                <button
                  onClick={() => deleteImgs(setBannerImage, setBannerImageUrl)}
                >
                  <img src={deleteIcon} alt="delete icon" className="h-5" />
                </button>
              </div>
            )}
            <button
              className="flex gap-2 px-3 py-2 bg-darkMidGray hover:bg-midGray focus:bg-lightMidGray rounded-2xl"
              onClick={() => document.getElementById("bannerInput").click()}
            >
              <img className="h-6" src={imageIcon} alt="upload banner" />
              <p>Add</p>
            </button>
            <input
              id="bannerInput"
              type="file"
              accept="image/"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, setBannerImage, setBannerImageUrl)
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="w-12">Icon</p>
            {iconImageUrl && (
              <div className="flex gap-2 items-center">
                <img
                  src={iconImageUrl}
                  alt="Icon preview"
                  className="w-10 h-10 object-cover"
                />
                <button
                  onClick={() => deleteImgs(setIconImage, setIconImageUrl)}
                >
                  <img src={deleteIcon} alt="delete icon" className="h-5" />
                </button>
              </div>
            )}
            <button
              className="flex gap-2 px-3 py-2 bg-darkMidGray hover:bg-midGray focus:bg-lightMidGray rounded-2xl"
              onClick={() => document.getElementById("iconInput").click()}
            >
              <img className="h-6" src={imageIcon} alt="upload icon" />
              <p>Add</p>
            </button>
            <input
              id="iconInput"
              type="file"
              accept="image/"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange(e, setIconImage, setIconImageUrl)
              }
            />
          </div>
        </section>
        <CommunityDetail
          name={name}
          description={desc}
          banner={bannerImageUrl}
          logo={iconImageUrl}
        />
      </div>
      <ModalButtons
        next={handleNext}
        back={backPage}
        isNextActive={imgsUploaded}
        btnNames={["Back", "Next"]}
      />
    </ModalTopSection>
  );
}
