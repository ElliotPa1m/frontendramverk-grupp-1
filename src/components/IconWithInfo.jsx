export const IconWithInfo = ({ icon, timeToCook }) => {
  let dataToShow = (i) => {
    switch (i) {
      case "time":
        return `clock ${timeToCook.replace("PT", "")}`;
      default:
        break;
    }
  };

  return (
    <>
      <div className="rounded-xl bg-white/80 px-2">{dataToShow(icon)}</div>
    </>
  );
};
