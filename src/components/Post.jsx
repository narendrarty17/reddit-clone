import user from "../assets/imgs/Post/user.png";
import {
  UpDownVote,
  Comment,
  Badge,
  Share,
} from "../assets/imgs/Post/PostSvgs.jsx";

export default function Post() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4 px-5 py-3 mx-1 md:mx-3 rounded-sm md:rounded-2xl hover:bg-lightMidGray">
        <section className="flex gap-3 items-center">
          <img className="w-7 rounded-full" src={user} alt="user icon" />
          <span className="text-white">r/insomina</span>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p>6 hr. ago</p>
          </div>
        </section>
        <h3 className="text-xl text-white">Anyone trying to sleep?</h3>
        <p>
          Awake at ungodly hourse per usual. whats up? how was your day? any
          randon thing about yourself you wanna share? whats on your mind?
          please share! I know it gets lonely for use insomniacs.
        </p>
        <section className="flex gap-3">
          <UpDownVote count="45" />
          <Comment count="11" />
          <Badge />
          <Share />
        </section>
      </div>
      <div className="mx-1 md:mx-3 h-[1px] mb-1 bg-gray-800"></div>
    </div>
  );
}
