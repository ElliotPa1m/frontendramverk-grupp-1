import { Link } from "react-router-dom";

export const LinkTextComp = ({ route, actionText }) => {
  return (
    <Link to={`${route}`} className="barlow-condenced-light font-medium">
      {actionText}
    </Link>
  );
};
