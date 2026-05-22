import { useState } from "react";

const TagInput = ({ label, value = [], onChange, error, placeholder }) => {
  // This state only handles the current word being typed in the box
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // Target the Enter key
    if (e.key === 'Enter') {
      // Essential: Prevent the browser from submitting the entire form
      e.preventDefault();

      const newTag = inputValue.trim();

      // Only add the tag if it's not empty AND not alreayd in our array
      if (newTag && !value.includes(newTag)) {
        onChange([...value, newTag]); // Send the updated array to React Hook Form
        setInputValue(''); // Clear the text input for the next tag
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {/* Soft UX Helper */}
      <p className="text-gray-500 text-xs mt-1 italic">
        Type a tag and press "Enter" to add it.
      </p>

      {/* The Dynamic Pill Container */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {value.map((tag) => (
            <span 
              key={tag} 
              className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium border border-blue-200 shadow-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-500 hover:text-blue-900 font-bold ml-1 focus:outline-none transition-colors"
                title={`Remove ${tag}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Hard validation error from Zod */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TagInput;