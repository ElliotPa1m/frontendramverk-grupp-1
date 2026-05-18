export const Icon = ({ icon }) => {
  let iconToShow = (i) => {
    switch (i) {
      case "toSave":
        return `toSave`;
      case "saved":
        return `saved`;
      case "time":
        return `clock`;
      default:
        console.log("default");
        break;
    }
  };
  return <>{iconToShow(icon)}</>;
};
