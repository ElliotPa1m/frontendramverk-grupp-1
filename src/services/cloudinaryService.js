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

  const formData = new FormData(); // Using FormData over JSON! JSON hates files haha so we use the browser API native FromData instead
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  // Domain Isolation: We keep these fetch operations separate and independent from api.js and axiosConfig. Everything Cloudinary lives here in this file
  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      // If Cloudinary sends back a useful JSON error message on failure
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to upload image to Cloudinary');
    }

    const data = await response.json();

    // We only want the URL to be saved to localStorage!
    return data.secure_url;
  } catch (err) {
    // Log the actual network error for debugging, then throw a clean error for the UI
    console.error('Cloudinary Service Error:', error);
    throw new Error('Image upload failed. Please check your connection and try again.');
  }
};