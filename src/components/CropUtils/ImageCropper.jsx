import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { useRef, useState } from "react";
import setCanvasPreview from "./setCanvasPreview";

const ImageCropper = ({ close, updateImage, type }) => {
  const ASPECT_RATIO = type === "logo" ? 1 : type === "post" ? 1.5 : 10;
  const MIN_DIMENSION = 150;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 X 150");
          return setImgSrc("");
        }
      });

      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 25,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const cropCenter = centerCrop(crop, width, height);
    setCrop(cropCenter);
  };

  return (
    <div className="mt-2 ml-1">
      <label className="block mb-3 w-fit">
        <span className="sr-only">Choose Profile photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-lightGray file:mr-4 file:py-1 file:px-2
            file:rounded-full file:border-0 file:text-xs file:cursor-pointer file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop={type === "logo" ? true : false}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="user upload"
              className="h-[300px] object-contain"
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateImage(dataUrl);
              close();
            }}
          >
            Crop
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4 hidden border border-black object-contain w-[150px] h-[150px]"
        />
      )}
    </div>
  );
};

export default ImageCropper;
