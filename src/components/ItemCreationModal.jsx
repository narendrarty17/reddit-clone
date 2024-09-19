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
import { ItemCreationContext } from "../context/ItemCreationContext";
import trackingDots from "./ModalPages/modalUtils/TrackingDots";

const modalPages = [
  "CommunityInfo",
  "SetBannerIcon",
  "CommunityCategory",
  "CommunityVisibility",
];

const modalComponents = {
  CommunityInfo: lazy(() => import("./ModalPages/CommunityInfo")),
  SetBannerIcon: lazy(() => import("./ModalPages/SetBannerIcon")),
  CommunityCategory: lazy(() => import("./ModalPages/CommunityCategory")),
  CommunityVisibility: lazy(() => import("./ModalPages/CommunityVisiblity")),
};

export default forwardRef(function ItemCreationModal({ onReset }, ref) {
  const dialog = useRef();
  const [currentPage, setCurrentPage] = useState("CommunityInfo");
  const [communityData, setCommunityData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    setFormSubmitted(false);
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

  const handleModalSubmit = async (data) => {
    console.log(
      "Inside handleModalSubmit before submitting community data: ",
      data
    );
    // Handle modal submit code here
    try {
      const response = await fetch("http://localhost:5000/community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Community data saved!");
        setFormSubmitted(true);
      } else {
        // Extract error message from the response
        const errorData = await response.json();
        const errorMessage =
          errorData.message || "Failed to save community data";
        alert(errorMessage);
        setFormSubmitted(false);
      }
    } catch (error) {
      // Handle network or other errors
      alert("An error occurred while saving community data.");
      setFormSubmitted(false);
    }

    if (dialog.current) {
      dialog.current.close();
    }
  };

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
    }
  }, [readyToSubmit, communityData, currentPage, handleCancel]);

  return createPortal(
    <ItemCreationContext.Provider
      value={{
        handleCancel,
        addCommunityData,
        submitPage,
        backPage,
        communityData,
        formSubmitted,
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
    </ItemCreationContext.Provider>,
    document.getElementById("modal")
  );
});
