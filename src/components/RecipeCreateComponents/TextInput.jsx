const TextInput = ({ label, placeholder, register, error, type = "text" }) => {
  // To be fully styled with Tailwind
  return (
    <div>
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors 
          ${error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {/* Hard validation error from Zod */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;