// Will handle the local file selection, basic security filtering (size/type), 
// and show an instant preview using URL.createObjectURL so that the user knows it worked. Instant feedback for good UX

import { useState, useEffect } from 'react';

const ImageUpload = ({ onFileSelect, error }) => {
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Frontend Security: Validate the file type. Current config: jpeg, png and webp allowed
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    // Frontend Security: Validate Size (Max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert('Image must be under 3MB.');
      return;
    }

    // Generate local preview URL. (Takes the uploaded raw binary data blob and generates a unique, temporary fake local URL string that points directly to that specific chunk of memory inside the browser)
    const localURL = URL.createObjectURL(file);
    setPreviewURL(localURL);

    // Bubble the file up to the Create Recipe page
    onFileSelect(file);
  };

  // Memory management: clean up the generated local object URL to prevent leaks
  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  return (
    // Will be styled with Tailwind later to feel cohesive with the rest of the site. The only styled tags for now are the input and the img
    <div className="image-upload-field">
      <label htmlFor="recipe-image">Recipe Photo</label>

      {/* We use a normal input here in the child component to keep it "dumb". The parent will use React Hook Form's <Controller> component to bridge the gap. */}
      {/* Also, the `accept=` here is purely UX! The frontend security code a few blocks up is the actual "gatekeeper" */}
      <input 
        id="recipe-image"
        type="file" 
        accept="image/jpeg, image/png, image/webp" 
        onChange={handleFileChange} 
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="error-text">{error}</p>}

      {previewURL && (
        <div className="image-preview-box">
          <img src={previewURL} alt="Recipe preview" className="w-48 rounded-lg mt-3 shadow-md object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;