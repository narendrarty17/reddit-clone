import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useRef,
  useState,
  lazy,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { GroupCreationContext } from "../context/GroupCreationContext";
import trackingDots from "./GroupCreationPgs/modalUtils/TrackingDots";

const modalPages = [
  "GroupInfo",
  "GroupImgs",
  "GroupCategory",
  "GroupVisibility",
];

const modalComponents = modalPages.reduce((components, page) => {
  components[page] = lazy(() => import(`./GroupCreationPgs/${page}`));
  return components;
}, {});

export default forwardRef(function GroupCreation({ onReset }, ref) {
  const dialog = useRef();
  const [currentPage, setCurrentPage] = useState("GroupInfo");
  const [communityData, setCommunityData] = useState({});
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const addCommunityData = (data) => {
    setCommunityData((prevState) => ({ ...prevState, ...data }));
  };
  const resetCommunityData = () => {
    setCommunityData({});
  };

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  const handleCancel = useCallback(() => {
    console.log("Handle cancel...");
    if (dialog.current) {
      dialog.current.close();
    }
    setCurrentPage("CommunityInfo");
    resetCommunityData();
    setReadyToSubmit(false);
  }, []);

  const submitPage = () => {
    setCurrentPage((prevPage) => {
      const i = modalPages.indexOf(prevPage) + 1;

      if (i === modalPages.length) {
        setReadyToSubmit(true);
        return prevPage; // No more pages, stay on the current one
      }

      if (i > modalPages.length - 1) {
        return prevPage; // No more pages, stay on the current one
      }

      return modalPages[i]; // Move to the next page
    });
  };

  const backPage = () => {
    if (modalPages.indexOf(currentPage) > 0) {
      setCurrentPage(modalPages[modalPages.indexOf(currentPage) - 1]);
    }
  };

  const uploadImageToCloudinary = async (image, groupId, type) => {
    const public_id = Date.now() + "-" + type; // Correctly evaluated timestamp
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "unsigned_upload"); // unsigned preset
    formData.append("public_id", public_id); // unique file name with timestamp

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dcfw2vxom/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const result = await response.json();
    return result.secure_url; // Return the secure URL of the uploaded image
  };

  const handleModalSubmit = useCallback(async (data) => {
    console.log(
      "Inside handleModalSubmit before submitting community data: ",
      data
    );
    try {
      const groupId = data.name.split(" ").join(""); // Make sure that you have the group id in your data
      const bannerPath = await uploadImageToCloudinary(
        data.bannerImage,
        groupId,
        "banner"
      );
      const iconPath = await uploadImageToCloudinary(
        data.iconImage,
        groupId,
        "logo"
      );

      data.bannerImage = bannerPath;
      data.iconImage = iconPath;

      // Handle modal submit code here

      const response = await fetch("http://localhost:5000/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Community data saved!");
      } else {
        // Extract error message from the response
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to save community data";
        alert(errorMessage);
      }
    } catch (error) {
      // Handle network or other errors
      alert("An error occurred while saving community data.");
    }
  }, []);

  const tracker = trackingDots(
    modalPages.length,
    modalPages.indexOf(currentPage)
  );

  // Dynamically select the component based on currentPage
  const CurrentPageComponent = modalComponents[currentPage];

  useEffect(() => {
    console.log("Current page: ", currentPage);
    console.log("Current community data stored: ", communityData);
    if (readyToSubmit) {
      handleModalSubmit(communityData);
      handleCancel();
    }
  }, [readyToSubmit, communityData, currentPage, handleCancel, handleModalSubmit]);

  return createPortal(
    <GroupCreationContext.Provider
      value={{
        handleCancel,
        addCommunityData,
        submitPage,
        backPage,
        communityData,
      }}
    >
      <dialog
        ref={dialog}
        className="absolute w-[100%] md:w-[700px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:top-[20%] md:left-[25%] md:translate-x-0 md:translate-y-0
         bg-midDarkGray rounded-2xl p-4"
      >
        <Suspense fallback={<div>Loading..</div>}>
          {CurrentPageComponent ? (
            <CurrentPageComponent key={currentPage} />
          ) : (
            <div>Component not found</div>
          )}
        </Suspense>
        <div className="flex gap-4">
          <section className="mt-4 hidden md:flex gap-1">{tracker}</section>
        </div>
      </dialog>
    </GroupCreationContext.Provider>,
    document.getElementById("modal")
  );
});
