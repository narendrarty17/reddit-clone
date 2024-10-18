import { useState } from "react";
import { RulesArrow } from "../../utils/svgComponents/GroupSidebarSvgs";

const memberCount = 14;
const memberOnline = 8;
const description = "A sub-reddit for all things dry eyes related!";
const name = "Dry Eyes";
const rules = [
  {
    ruleText: "Be kind, supportive, respectuful and polite.",
    ruleInDetail:
      "Disagree is fine as long as it is not disagreeable or rude. If one is disagreeable and/or rude, in the sole judgment of the mods, your post or comment will be removed. If it continues or is chronic one can be banned temporarily or permanently from the sub.",
  },
  {
    ruleText: "Do not give a diagnosis or medical advice.",
    ruleInDetail:
      "What constitutes medical advice “over the line” will be in the sole judgement of the mods. Examples: Giving an opinion on an eye image asking for what is it is diagnosing thus medical advice. Telling someone what to do for X is medical advice. Stating what you did and why in your similar situation is encouraged. Also do encourage seeing an eye doctor with you comment. Opinions on meibography images is medical advice. Links to where to compare their image to others for themselves is not.",
  },
  {
    ruleText: "No marketing, span, advertising or self-promotion.",
    ruleInDetail:
      "Self-promotion of services or products, suggestions to be contacted in posts or comments if commercial, links to one’s website, employer’s website or seeming to be receiving compensation from a post or comment that is prohibited.",
  },
  {
    ruleText: "Offering to buy, sell or give away medications is prohibited.",
    ruleInDetail:
      "Sure giving away medications one can’t use is well meaning and it is inappropriate. Only doctors can decide on who should get a medication via a prescription.",
  },
  {
    ruleText:
      "Posts and comments that are off-topic of this sub are not allowed.",
    ruleInDetail:
      "Posts and comments that are off topic in the judgment of the mods will be removed and if continued the person posting will be banned.",
  },
  {
    ruleText: "No Claiming Credentials",
    ruleInDetail:
      "This includes physicians, optometrists, advanced practice providers, nurses, pharmacists, therapists, healthcare students, technicians, and more. If you currently or in the past interacted regularly with patients and charts in an eye doctor's office are included. Why? We do not want to get into vetting processes. Without a vetting process anyone can claim to be anything. Lastly, professionals can be poorly informed on a subject and biased like anyone else.",
  },
  {
    ruleText: "This sub is not set up to deal with a suicidal crisis.",
    ruleInDetail:
      "Sure it can get that tough for some with DED/MGD. One can find help for a suicidal crisis in the USA by dialing 988 anytime. If out of the USA you can find help in any country here. Posting threats of suicide or indication of suicidal intent in a post (intent is determined in the judgment of the mods), the post will be removed and reported to Reddit admin.",
  },
];

function NameAndDesc() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-bold">{name}</h3>
        <p>{description}</p>
      </div>
    </section>
  );
}

function MembersCount() {
  return (
    <section className="flex gap-32">
      <div className="flex flex-col gap-1">
        <span className="font-bold text-white">{memberCount}K</span>
        <p>Members</p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-white">{memberOnline}</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p>Online</p>
        </div>
      </div>
    </section>
  );
}

function Rules() {
  const [clickedRule, setClickedRule] = useState(null);
  const handleRuleClick = (index) => {
    setClickedRule((prevState) => {
      if (prevState === null) {
        setClickedRule(index);
      } else {
        setClickedRule(null);
      }
    });
  };
  return (
    <section className="flex flex-col gap-4">
      <h3 className="font-bold">RULES</h3>
      <ol type="1" start="1" className="flex flex-col gap-4 pl-4">
        {rules.map((rule, index) => (
          <li
            onClick={() => handleRuleClick(index)}
            key={index}
            className="flex flex-col gap-2"
          >
            <div className="flex gap-2">
              <div className="flex w-[260px]">
                <span className="mr-2">{index + 1}.</span>
                <span>{rule.ruleText}</span>
              </div>
              <RulesArrow
                direction={
                  parseInt(clickedRule) === parseInt(index) ? "up" : "down"
                }
              />
            </div>
            {parseInt(clickedRule) === parseInt(index) && (
              <div className="pl-3 w-[260px]">{rule.ruleInDetail}</div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export { NameAndDesc, MembersCount, Rules };
