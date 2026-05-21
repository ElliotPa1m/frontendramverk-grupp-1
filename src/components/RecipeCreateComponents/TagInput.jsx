import { useState } from "react";

const TagInput = ({ label, value = [], onChange, error, placeholder }) => {
  // This state only handles the current word being typed in the box
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    // To be coded
  }

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

      {/* Hard validation error from Zod */}
      {error && <p>{error}</p>}
    </div>
  )
}