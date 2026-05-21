import { Link } from "react-router-dom";

const FeatureCard = ({ title, description, to, linkText }) => {
  return (
    <div
      className="flex flex-col items-center gap-2 
    p-2 pb-4 sm:p-8 
    h-fit
    basis-w-[300px] grow max-w-[400px]
    bg-white shadow-md 
    rounded-lg
    text-center 
    transition-all duration-300 
    hover:-translate-y-1 hover:shadow-lg"
    >
      <h2 className="barlow-condensed-regular text-xl text-text">{title}</h2>
      <p className="barlow-condensed-light text-text">{description}</p>
      <Link
        to={to}
        className="barlow-condensed-light bg-button text-white px-6 py-2 rounded-full"
      >
        {linkText} →
      </Link>
    </div>
  );
};

export default FeatureCard;
