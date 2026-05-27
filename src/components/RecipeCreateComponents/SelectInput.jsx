import { InlineFormError } from "./InlineFormError";

const SelectInput = ({ label, options, register, error, placeholder }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-700">{label}</label>

      <select
        {...register}
        className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pop transition-colors bg-white ${
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
      {error && <InlineFormError message={error} />}
    </div>
  );
};

export default SelectInput;