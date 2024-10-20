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
import { uploadGroupCreationData } from "../services/uploadService";
import { Loading } from "./utils/Loading";

import { useSelector } from "react-redux";

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

export default forwardRef(function GroupCreation({ updateList }, ref) {
  const dialog = useRef();
  const [currentPage, setCurrentPage] = useState("GroupInfo");
  const [communityData, setCommunityData] = useState({});
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const googleId = useSelector((state) => state.auth.googleId);

  const addCommunityData = useCallback((data) => {
    setCommunityData((prevState) => ({ ...prevState, ...data }));
  }, []);

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
    if (dialog.current) {
      dialog.current.close();
    }
    setCurrentPage("GroupInfo");
    resetCommunityData();
    setReadyToSubmit(false);
  }, []);

  const submitPage = () => {
    setCurrentPage((prevPage) => {
      const i = modalPages.indexOf(prevPage) + 1;

      if (i === modalPages.length) {
        setCommunityData((prev) => {
          return { ...prev, googleId };
        });
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

  const handleModalSubmit = useCallback(
    async (data) => {
      try {
        const update = await uploadGroupCreationData(data);
        if (update === true) {
          updateList();
        }
      } catch (error) {
        console.error("Error uploading data: ", error);
      }
    },
    [updateList]
  );

  const tracker = trackingDots(
    modalPages.length,
    modalPages.indexOf(currentPage)
  );

  // Dynamically select the component based on currentPage
  const CurrentPageComponent = modalComponents[currentPage];

  useEffect(() => {
    if (readyToSubmit) {
      // Run submission logic only once when readyToSubmit is true
      handleModalSubmit(communityData).then(() => {
        handleCancel(); // Reset modal after submission
        setReadyToSubmit(false); // Ensure this does not trigger again
      });
    }
  }, [readyToSubmit, communityData, handleModalSubmit, handleCancel]);

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
        <Suspense fallback={<Loading type="groupCreation" />}>
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
