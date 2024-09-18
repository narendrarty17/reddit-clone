import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useRef,
  useState,
  lazy,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { ItemCreationContext } from "../context/ItemCreationContext";
import useForm from "../hooks/useForm";
import trackingDots from "./ModalPages/modalUtils/TrackingDots";
import FinalSummary from "./ModalPages/FinalSummary";

const modalPages = [
  "CommunityInfo",
  "SetBannerIcon",
  "CommunityCategory",
  "CommunityVisibility",
  "FinalSummary",
];

const modalComponents = {
  CommunityInfo: lazy(() => import("./ModalPages/CommunityInfo")),
  SetBannerIcon: lazy(() => import("./ModalPages/SetBannerIcon")),
  CommunityCategory: lazy(() => import("./ModalPages/CommunityCategory")),
  CommunityVisibility: lazy(() => import("./ModalPages/CommunityVisiblity")),
  FinalSummary: lazy(() => import("./ModalPages/FinalSummary")),
};

export default forwardRef(function ItemCreationModal({ onReset }, ref) {
  const dialog = useRef();
  const [currentPage, setCurrentPage] = useState("CommunityInfo");
  const [submitData, setSubmitData] = useState(false);
  const {
    name,
    desc,
    updateCommunityName,
    updateCommunityDesc,
    addCommunityData,
    resetCommunityData,
    communityData,
  } = useForm();

  useImperativeHandle(ref, () => {
    return {
      open() {
        if (dialog.current) {
          dialog.current.showModal();
        }
      },
    };
  });

  const handleCancel = () => {
    console.log("Handle cancel...");
    if (dialog.current) {
      dialog.current.close();
    }
    updateCommunityName("");
    updateCommunityDesc("");
    setCurrentPage("CommunityInfo");
    // resetCommunityData();
  };

  const submitPage = () => {
    setCurrentPage((prevPage) => {
      const i = modalPages.indexOf(prevPage) + 1;

      if (i > modalPages.length - 1) {
        setSubmitData(true); // Show final summary or handle submission
        return prevPage; // No more pages, stay on the current one
      }

      return modalPages[i]; // Move to the next page
    });
  };

  useEffect(() => {
    console.log("Current page inside useEffect: ", currentPage);
    console.log("inside submit page community data collected: ", communityData);
  }, [currentPage]);

  const backPage = () => {
    if (modalPages.indexOf(currentPage) > 0) {
      setCurrentPage(modalPages[modalPages.indexOf(currentPage) - 1]);
    }
  };

  const tracker = trackingDots(
    modalPages.length,
    modalPages.indexOf(currentPage)
  );

  // Dynamically select the component based on currentPage
  const CurrentPageComponent = modalComponents[currentPage];

  return createPortal(
    <ItemCreationContext.Provider
      value={{
        handleCancel,
        addCommunityData,
        submitPage,
        updateCommunityName,
        updateCommunityDesc,
        backPage,
        name,
        desc,
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
          <p className="text-white">{currentPage}</p>
        </div>
      </dialog>
    </ItemCreationContext.Provider>,
    document.getElementById("modal")
  );
});
