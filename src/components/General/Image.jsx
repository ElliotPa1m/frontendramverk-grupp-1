export const Image = ({ imgUrl, recipeName }) => {
  return (
    <img
      className="w-full aspect-square object-cover object-center"
      src={imgUrl}
      alt={`image of ${recipeName}`}
    />
  );
};
