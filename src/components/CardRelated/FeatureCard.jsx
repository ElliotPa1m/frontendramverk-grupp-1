import { Link } from "react-router-dom";
import { Icon } from "../General/Icon";
import { HeadingComp } from "../General/HeadingComp";
import { ParagraphComp } from "../General/ParagraphComp";

const FeatureCard = ({ title, description, to, linkText }) => {
  return (
    <div
      className="flex flex-col items-center gap-2 
    p-2 pb-4 md:p-6 lg:p-8
    basis-h-fit grow max-h-full 
    basis-w-[300px] grow max-w-full md:max-w-[30%] lg:max-w-[400px]
    bg-white shadow-md 
    rounded-lg
    text-center 
    transition-all duration-300 
    hover:-translate-y-1 hover:shadow-lg"
    >
      <HeadingComp text={title} size={"h3"} />
      <ParagraphComp text={description} />
      <Link
        to={to}
        className="barlow-condensed-light bg-button text-white px-6 py-2 mt-auto rounded-full"
      >
        <span className="pe-2">{linkText}</span> <Icon icon={"arrowRight"} />
      </Link>
    </div>
  );
};

export default FeatureCard;
