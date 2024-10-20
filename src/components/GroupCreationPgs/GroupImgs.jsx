import ModalTopSection from "./modalUtils/ModalTopSection";
import GroupDetail from "./modalUtils/GroupDetail";
import { useContext, useEffect, useState } from "react";
import { GroupCreationContext } from "../../context/GroupCreationContext";
import ModalButtons from "./modalUtils/ModalButtons";
import { Delete } from "../utils/svgComponents/GroupCreationSvgs";
import CropImage from "../CropImage";
import { base64ToBlob, compressImage } from "../../services/imageService";

const title = "Style your community";
const description =
  "Adding visual flair will catch new members attention and help establish your community's culture!<br /> You can update this at any time";

export default function GroupImgs() {
  const { communityData, submitPage, addCommunityData, backPage } =
    useContext(GroupCreationContext);
  const [bannerImage, setBannerImage] = useState(
    communityData.bannerImage ?? null
  );
  const [bannerImageUrl, setBannerImageUrl] = useState(
    communityData.bannerImage
      ? URL.createObjectURL(base64ToBlob(communityData.bannerImage))
      : null
  );
  const [iconImage, setIconImage] = useState(communityData.iconImage ?? null);
  const [iconImageUrl, setIconImageUrl] = useState(
    communityData.iconImage
      ? URL.createObjectURL(base64ToBlob(communityData.iconImage))
      : null
  );
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setName(communityData.name);
    setDesc(communityData.description);
  }, [communityData]);

  const handleImageChange = async (img, setter, setterUrl) => {
    let image;

    if (typeof img === "string" && img.startsWith("data:")) {
      // If img is a base64 string, convert to Blob
      image = base64ToBlob(img, "image/jpeg"); // Adjust contentType as needed
    } else if (img instanceof Blob || img instanceof File) {
      // If it's already a Blob or File
      image = img;
    } else {
      console.error("Invalid image type passed:", img);
      return;
    }
    setterUrl(URL.createObjectURL(image));
    const compressedImg = await compressImage(image);
    setter(compressedImg);
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
                  <Delete />
                </button>
              </div>
            )}
            <CropImage
              type="banner"
              updateImage={(img) => {
                handleImageChange(img, setBannerImage, setBannerImageUrl);
              }}
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
                  <Delete />
                </button>
              </div>
            )}
            <CropImage
              type="logo"
              updateImage={(img) => {
                handleImageChange(img, setIconImage, setIconImageUrl);
              }}
            />
          </div>
        </section>
        <GroupDetail
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
