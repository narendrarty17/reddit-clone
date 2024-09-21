import bannerImage from "../../assets/imgs/Modal/defaultBanner.png";
import logoImage from "../../assets/imgs/CommunityHome/logoDefault.png";
import bellImage from "../../assets/imgs/CommunityHome/bell.svg";

export default function CommunityHeader() {
  return (
    <div className="w-[100%]">
      <section className="md:pl-4 md:pr-1 md:py-2 w-[100%]">
        <img
          className="w-[100%] h-20 md:h-24 md:rounded-lg"
          src={bannerImage}
          alt="community banner"
        />
        <div className="px-3 pt-3 md:px-6 md:pt-0 md:mt-[-40px] flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-end">
          <div className="flex items-start gap-3 md:gap-4">
            <img
              className="w-12 h-12 md:h-24 md:w-24 rounded-full"
              src={logoImage}
              alt="community logo"
            />
            <div className="mt-0 md:mt-[50px]  text-white font-bold">
              <h3 className="text-xl md:text-3xl">r/dryEyes</h3>
              <div className="flex md:hidden gap-3 items-center text-sm font-normal text-veryLightGray">
                <span>422k members</span>
                <span className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p>59 online</p>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="flex gap-2 px-2 py-1 items-center border-gray-400 border-[1px] rounded-3xl">
              <span className="text-2xl">+</span>
              <p className="text-md">Create Post</p>
            </div>
            <div className="flex items-center justify-center border-[1px] border-gray-400 rounded-full p-2">
              <img className="h-6 w-6" src={bellImage} alt="notification" />
            </div>
            <div className="flex gap-2 px-3 py-2 items-center border-gray-400 border-[1px] rounded-3xl">
              <p className="text-md">Joined</p>
            </div>
            <div className="flex gap-1 px-2 py-4 rounded-full border-[1px] border-gay-400">
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
