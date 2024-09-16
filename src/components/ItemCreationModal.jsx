import {
  forwardRef,
  Suspense,
  useImperativeHandle,
  useRef,
  useState,
  lazy,
} from "react";
import { createPortal } from "react-dom";
import { ItemCreationContext } from "../context/ItemCreationContext";
import useForm from "../hooks/useForm";

const modalPages = ["CommunityInfo", "SetBannerIcon"];

const modalComponents = {
  CommunityInfo: lazy(() => import("./ModalPages/CommunityInfo")),
  SetBannerIcon: lazy(() => import("./ModalPages/SetBannerIcon")),
};

export default forwardRef(function ItemCreationModal({ onReset }, ref) {
  const dialog = useRef();
  const [currentPage, setCurrentPage] = useState("CommunityInfo");

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
  };

  const submitPage = () => {
    const i = modalPages.indexOf(currentPage) + 1;
    if (i > modalPages.length - 1) {
      return <div>No more pages in modal is present</div>;
    }
    setCurrentPage(modalPages[i]);
  };

  const { addCommunityData } = useForm();

  // Dynamically select the component based on currentPage
  const CurrentPageComponent = modalComponents[currentPage];

  return createPortal(
    <ItemCreationContext.Provider
      value={{
        handleCancel,
        addCommunityData,
        submitPage,
      }}
    >
      <dialog
        ref={dialog}
        className="absolute w-[100%] md:w-[700px] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:top-[20%] md:left-[25%] md:translate-x-0 md:translate-y-0
         bg-midDarkGray rounded-2xl p-4"
      >
        <Suspense fallback={<div>Loading..</div>}>
          {CurrentPageComponent ? (
            <CurrentPageComponent />
          ) : (
            <div>Component not found</div>
          )}
        </Suspense>
      </dialog>
    </ItemCreationContext.Provider>,
    document.getElementById("modal")
  );
});
