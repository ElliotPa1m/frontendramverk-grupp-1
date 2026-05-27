export function sanitizeInstructions(instructionString) {
  if (!instructionString) return [];

  return instructionString
    // 1. Normalize carriage returns to standard newlines
    .replace(/\r\n/g, "\n")
    // 2. Split by newline
    .split("\n")
    // 3. Scrub leading numbers, "Step X", and punctuation
    .map(step => {
      return step
        .replace(/^(?:\s*(?:step\s*\d+|[0-9]+)[.:)-]?\s*)+/gi, "")
        .trim();
    })
    // 4. The Final Filter: Drop empty strings OR strings that are ONLY numbers
    .filter(step => {
      // ^ asserts position at start of string
      // \d+ matches one or more digits (0-9, 10-99, etc.)
      // $ asserts position at the end of the string
      const isOnlyNumbers = /^\d+$/.test(step);
      
      return step.length > 0 && !isOnlyNumbers;
    });
}