import { Link } from "react-router-dom";

export const SeeAllLinkComp = ({ route }) => {
  return (
    <Link
      to={`${route}`}
      className="barlow-condenced-light text-sm text-end block my-2"
    >
      See all
    </Link>
  );
};
