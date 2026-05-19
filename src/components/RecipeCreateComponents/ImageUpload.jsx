// Will handle the local file selection, basic security filtering (size/type), 
// and show an instant preview using URL.createObjectURL so that the user knows it worked. Instant feedback for good UX

import { useState, useEffect } from 'react';
import { preview } from 'vite';

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
    <div>ImageUpload</div>
  )
}

export default ImageUpload