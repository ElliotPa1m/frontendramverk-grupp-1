export const IconButton = ({ icon, actionHandler }) => {
  let dataToShow = (i) => {
    switch (i) {
      case "toSave":
        return `toSave`;
      case "saved":
        return `saved`;
      default:
        break;
    }
  };

  return (
    <>
      <button
        className="hover:cursor-pointer rounded-xl bg-white/80 px-2"
        onClick={actionHandler}
      >
        {dataToShow(icon)}
      </button>
    </>
  );
};
