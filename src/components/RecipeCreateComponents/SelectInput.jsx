const SelectInput = ({ label, options, register, error, placeholder }) => {
  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>

      <select
        {...register}
        className={`border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {/* The disabled placeholder option */}
        <option value="" disabled>
          {placeholder}
        </option>

        {/* Dynamically render the list of options (categories or areas in our case) */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Hard validation error from Zod */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SelectInput;