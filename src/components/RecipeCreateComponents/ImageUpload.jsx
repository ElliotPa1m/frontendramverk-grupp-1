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
  }
  return (
    <div>ImageUpload</div>
  )
}

export default ImageUpload