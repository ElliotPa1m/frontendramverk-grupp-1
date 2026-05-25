export const instructionCleaningFn = (text) => {
  const steps = text
    .filter((item) => !/^step\s+\d+/i.test(item))
    .map((item) => item.replace(/\r/g, "").trim());

  return steps;
};
