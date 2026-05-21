import { useState } from "react";

const TagInput = ({ label, value = [], onChange, error, placeholder }) => {
  // This state only handles the current word being typed in the box
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>

      {/* Hard validation error from Zod */}
      {error && <p>{error}</p>}
    </div>
  )
}