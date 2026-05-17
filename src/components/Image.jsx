export const Image = ({ imgUrl, recipeName }) => {
  return (
    <img
      className="w-full object-cover object-center"
      src={imgUrl}
      alt={`image of ${recipeName}`}
    />
  );
};
