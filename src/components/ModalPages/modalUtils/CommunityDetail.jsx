import defaultLogo from "../../../assets/imgs/Modal/defaultLogo.svg";

export default function CommunityDetail({ name, description, banner, logo }) {
  return (
    <div className="flex flex-col gap-3 p-3 order-1 md:order-2 w-60 h-32 shadow-dark-custom rounded-2xl">
      <div className="flex gap-3 items-center">
        <img
          className="h-9 rounded-full"
          src={defaultLogo}
          alt="default community logo"
        />
        <div className="flex flex-col">
          <h2 className="text-xl text-white font-semibold">
            r/
            {name
              ? name.length < 14
                ? name
                : name.slice(0, 14) + ".."
              : "communityName"}
          </h2>
          <p className="text-veryLightGray">1 member . 1 online</p>
        </div>
      </div>
      <p className="text-white">
        {description
          ? description.length < 45
            ? description
            : description.slice(0, 45) + ".."
          : "Your community description"}
      </p>
    </div>
  );
}
