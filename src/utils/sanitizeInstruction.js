export function sanitizeInstructions(instructionString) {
  if (!instructionString) return [];

  // Phase 1: Normalize, split, scrub, capitalize, and remove pure garbage
  const cleanedSteps = instructionString
    .replace(/\r\n/g, "\n")
    .replace(/(?<=[.!?])\s*(?=[A-Z])/g, "\n")
    .split("\n")
    .map(step => {
      let cleaned = step
        // THE UPDATE: Added negative lookahead to protect time-based numbers
        .replace(/^(?:\s*(?:step\s*\d+|\d+(?!\d)(?!\s*min(?:ute)?s?\b))[.:)-]?\s*)+/gi, "")
        .trim();
        
      if (cleaned.length > 0) {
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
      }
      
      return cleaned;
    })
    .filter(step => step.length > 0 && !/^\d+$/.test(step));

  // Phase 2: The Single-Word Gatekeeper
  return cleanedSteps.filter((step, index) => {
    const isSingleWord = step.trim().split(/\s+/).length === 1;
    const isLastStep = index === cleanedSteps.length - 1;
    
    return !isSingleWord || isLastStep;
  });
}