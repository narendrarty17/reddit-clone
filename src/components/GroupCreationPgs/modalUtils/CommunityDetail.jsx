import defaultLogo from "../../../assets/imgs/Modal/defaultLogo.svg";
import defaultBanner from "../../../assets/imgs/Modal/defaultBanner.svg";

export default function CommunityDetail({
  name,
  description,
  banner = null,
  logo = null,
}) {
  return (
    <div className="flex flex-col gap-4 order-1 md:order-2 w-64 h-48 pb-4 shadow-dark-custom rounded-2xl">
      {/* banner */}
      <img
        className="w-full h-8 rounded-t-2xl"
        src={banner || defaultBanner}
        alt="community banner"
      />

      {/* rest of the card */}
      <div className="flex gap-3 px-4 items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={logo || defaultLogo}
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
      <p className="px-4 text-white">
        {description
          ? description.length < 45
            ? description
            : description.slice(0, 45) + ".."
          : "Your community description"}
      </p>
    </div>
  );
}
