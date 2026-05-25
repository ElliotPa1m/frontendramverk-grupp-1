export const instructionCleaningFn = (text) => {
  const steps = text
    .filter((item) =>
      item
        .replace(/^step\s+\d+/i, "") // remove "step x"
        .replace(/▢/g, "") // remove checkbox symbol
        .replace(/\r/g, "") // remove returns
        .trim(),
    )
    .map((item) => item.replace(/\r/g, "").trim());

  return steps;
};
