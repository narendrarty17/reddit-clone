import defaultLogo from "../../assets/imgs/Global/defaultLogo.svg";

export default function CreatePostHead({ name, logo }) {
  const groupName = name || "Group Name";
  const groupLogo = logo || defaultLogo;
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Create Post</h3>
        <span className="text-white">Drafts</span>
      </div>
      <button className="self-start text-white flex gap-2 bg-midGray hover:bg-gray-700 px-4 py-3 rounded-3xl">
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
