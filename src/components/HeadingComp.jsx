export const HeadingComp = ({ text, size }) => {
  const headingHTML = () => {
    switch (size) {
      case "h1":
        return (
          <h1 className="barlow-condensed-regular text-3xl text-text mb-4">
            {text}
          </h1>
        );
      case "h2":
        return (
          <h2 className="barlow-condensed-regular text-2xl text-text mb-4">
            {text}
          </h2>
        );
      case "h3":
        return (
          <h2 className="barlow-condensed-regular text-xl text-text">{text}</h2>
        );

      default:
        <h1 className="barlow-condensed-regular text-3xl text-text mb-4">
          {text}
        </h1>;
    }
  };

  return <>{headingHTML()}</>;
};
