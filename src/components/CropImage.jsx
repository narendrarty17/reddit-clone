import { useState } from "react";
import ImageCropper from "./CropUtils/ImageCropper";
import "react-image-crop/dist/ReactCrop.css";
import { Image } from "../components/utils/svgComponents/GroupCreationSvgs";
import { Close } from "../components/utils/svgComponents/GroupCreationSvgs";

function CropImage({ type, updateImage }) {
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const openCropModal = () => setIsCropModalOpen(true);
  const closeCropModal = () => setIsCropModalOpen(false);

  return (
    <div className="bg-gray-900 text-white">
      {/* Button to open the modal */}
      <button
        onClick={openCropModal}
        className="flex gap-2 px-3 py-2 bg-darkMidGray hover:bg-midGray focus:bg-lightMidGray rounded-2xl"
      >
        <p>Add</p>
        <Image />
      </button>

      {/* Modal */}
      {isCropModalOpen && (
        <div className="fixed inset-0 bg-midDarkGray bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="absolute w-[100%] h-[100%] md:w-[700px] top-0
         bg-midDarkGray rounded-2xl p-4"
          >
            <button
              onClick={closeCropModal}
              className="absolute top-0 right-0 mt-3 mr-4 text-3xl text-veryLightGray hover:text-white"
            >
              <Close />
            </button>
            <ImageCropper
              type={type}
              updateImage={updateImage}
              close={closeCropModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CropImage;
