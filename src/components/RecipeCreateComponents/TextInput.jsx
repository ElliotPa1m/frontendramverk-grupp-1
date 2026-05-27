import { InlineFormError } from "./InlineFormError";

const TextInput = ({ label, placeholder, register, error, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-700">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pop transition-colors 
          ${error ? 'border-red-500' : 'border-gray-300'
        }`}
      />

      {/* Hard validation error from Zod */}
      {error && <InlineFormError message={error} />}
    </div>
  );
};

export default TextInput;