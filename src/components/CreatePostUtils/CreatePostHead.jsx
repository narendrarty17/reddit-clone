import defaultLogo from "../../assets/imgs/Global/defaultLogo.svg";
import { Close } from "../svgComponents/GroupCreationSvgs";

export default function CreatePostHead({ name, logo, close }) {
  const groupName = name || "Group Name";
  const groupLogo = logo || defaultLogo;
  return (
    <section className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Create Post</h3>
        <Close handleClose={close} />
      </div>
      <button className="self-start text-white flex gap-4 bg-midGray hover:bg-gray-700 px-3 py-3 rounded-3xl">
        <img
          className="w-7 h-7 rounded-full"
          src={groupLogo}
          alt="group logo"
        />
        <span>{groupName}</span>
        {/* <DownArrow /> */}
      </button>
    </section>
  );
}
