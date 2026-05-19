/**
 * Uploads an image file to Cloudinary using an unsigned upload preset.
 * * @param {File} file - The raw image file from the input component
 * @returns {Promise<string>} - The optimized CDN URL string
 */
export const uploadImage = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

  // Guard Clause: Fail early and loudly if the .env file is missing
  if (!cloudName || !uploadPreset) {
    console.error("Missing Cloudinary environment variables. Check your .env file.");
    throw new Error("Configuration error: Cannot connect to image server.");
  }
};