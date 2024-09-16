import { useState, useRef, useContext } from "react";
import { ItemCreationContext } from "../../context/ItemCreationContext";
import ModalTopSection from "./modalUtils/ModalTopSection";

export default function CommunityInfo() {
  const communityName = useRef();
  const communityDesc = useRef();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState();

  const title = "Tell us about your community";
  const description =
    "A name and description help people understand what your community is all about";

  const { submitPage, handleCancel, addCommunityData } =
    useContext(ItemCreationContext);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid) {
      //   onReset(communityName.current.value, communityDesc.current.value);
      addCommunityData({ name: name, description: desc });
      setName("");
      setDesc("");
      communityName.current.value = "";
      communityDesc.current.value = "";
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
              ref={communityName}
              onChange={handleChangeName}
              className="rounded-2xl h-14 p-4 outline-none bg-darkMidGray hover:bg-midGray"
              type="text"
              value={name}
              placeholder="Community name*"
            />
            <textarea
              ref={communityDesc}
              onChange={handleChangeDesc}
              className="rounded-2xl h-40 p-4 md:w-auto outline-none bg-darkMidGray hover:bg-midGray"
              value={desc}
              placeholder="Descripton*"
            />
          </div>
          <div className="flex flex-col gap-3 p-3 order-1 md:order-2 w-60 h-32 shadow-dark-custom rounded-2xl">
            <div className="flex flex-col">
              <h2 className="text-xl text-white font-semibold">
                r/{name ? name : "communityName"}
              </h2>
              <p className="text-veryLightGray">1 member . 1 online</p>
            </div>
            <p className="text-white">Your community description</p>
          </div>
        </section>
        <form
          className="flex justify-start md:justify-end gap-2"
          method="dialog"
          onSubmit={handleSubmit}
        >
          <button
            className="text-white px-4 py-2 bg-darkMidGray hover:bg-midGray rounded-3xl"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-darkMidGray
              ${formValid ? " text-white hover:bg-midGray" : " text-lightGray"}
              rounded-3xl`}
            type="submit"
          >
            Submit
          </button>
          )
        </form>
      </ModalTopSection>
      {error && <div className="text-red-400 font-semibold">*{error}</div>}
    </>
  );
}
