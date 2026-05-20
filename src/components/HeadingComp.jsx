export const HeaderComp = ({ text, size }) => {
  if (size === "h1") {
    return (
      <h1 className="barlow-condensed-regular text-3xl text-text mb-4">
        {text}
      </h1>
    );
  }
  if (size === "h2") {
    return (
      <h2 className="barlow-condensed-regular text-2xl text-text">{text}</h2>
    );
  }
};
