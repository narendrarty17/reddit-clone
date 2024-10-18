import { useCallback, useEffect, useState } from "react";
import { compressImage } from "../../services/imageService";

const contentTypeList = ["text", "image", "link"];
const style =
  "rounded-3xl border-midGray border-[2px] bg-darkGray px-4 py-4 text-lg w-full";

export default function CreatePostInput({ handlePostData }) {
  const [selectedType, setSelectedType] = useState("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState({
    type: "",
    value: "",
    name: false,
  });
  const [btnActive, setBtnActive] = useState(false);

  const showInputBox = (type) => {
    switch (type) {
      case "image":
        return (
          <div>
            <input
              type="file"
              onChange={(e) => handleContentChange(e, "image")}
            />
          </div>
        );

      case "link":
        return (
          <input
            className={style}
            type="text"
            onChange={(e) => handleContentChange(e, "link")}
            placeholder="Enter a link"
            value={content.value}
            maxLength="50"
          />
        );

      default:
        return (
          <textarea
            className={`${style} h-36`}
            onChange={(e) => handleContentChange(e, "text")}
            placeholder="Body"
            value={content.value}
            maxLength="300"
          />
        );
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = async (e, type) => {
    const allowedTypes = ["jpg", "jpeg", "png"];
    const file = type === "image" ? e.target.files[0] : null;
    const maxSize = 4 * 1024 * 1024;

    const isValidImage =
      file && allowedTypes.includes(file.name.split(".").pop().toLowerCase());

    if (type === "image" && !isValidImage) {
      alert("Only jpg, jpeg, or png files are allowed");
      return;
    } else if (type === "image" && file.size > maxSize) {
      alert("File size exceeds 4 MB. Please choose a smaller file");
      return;
    }

    const compressedImg = file ? await compressImage(file) : null;

    // Update the content state
    setContent((prevContent) => ({
      ...prevContent,
      type, // Set the content type
      value: compressedImg || e.target.value, // Set the file or input value
      name: file ? file.name : e.target.value.trim() !== "" ? true : false, // Set the name if it's a valid file, or true if input has a value
    }));
  };

  const updateBtnVisibility = useCallback(() => {
    setBtnActive(title.trim() !== "" && content.name);
  }, [title, content.name]);

  const handleTypeSelection = (value) => {
    setSelectedType(value);
    setContent({
      type: "",
      value: "",
      name: false,
    }); // Reset file name when switching types
  };

  const handleSubmit = async () => {
    console.log(content);
    const { name, ...rest } = content;
    handlePostData({
      title: title,
      content: rest,
    });
    handleCancel();
  };

  const handleCancel = () => {
    setTitle("");
    setContent({
      type: "",
      value: "",
      name: false,
    });
    setSelectedType("text");
  };

  useEffect(() => {
    updateBtnVisibility();
  }, [updateBtnVisibility]);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <ul className="flex gap-6 pl-4 pb-4 text-white font-semibold">
          {contentTypeList.map((contentType) => (
            <li
              onClick={() => handleTypeSelection(contentType)}
              key={contentType}
              className="relative cursor-pointer pb-3"
            >
              {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
              {contentType === selectedType && (
                <span className="absolute bottom-0 left-0 right-0 h-[4px] bg-blue-600 rounded-full"></span>
              )}
            </li>
          ))}
        </ul>
        <input
          onChange={(e) => handleTitleChange(e)}
          className={style}
          type="text"
          maxLength={150}
          placeholder="Title*"
          value={title}
        />
      </div>
      {showInputBox(selectedType)}
      <div className="self-end flex gap-6">
        <button
          onClick={handleCancel} // Use 'undefined' instead of 'null'
          className={`px-4 py-2 bg-midGray ${
            btnActive
              ? "hover:bg-gray-700 text-white"
              : "opacity-50 cursor-not-allowed"
          } rounded-full`}
          disabled={!btnActive} // Disable button if not active
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 bg-midGray ${
            btnActive
              ? "hover:bg-gray-700 text-white"
              : "opacity-50 cursor-not-allowed"
          } rounded-full`}
          disabled={!btnActive} // Disable button if not active
        >
          Post
        </button>
      </div>
    </section>
  );
}
