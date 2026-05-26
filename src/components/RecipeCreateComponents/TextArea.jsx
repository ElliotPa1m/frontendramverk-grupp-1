// To be used to capture Instructions steps. Will have an optional `helperText` prop that in this case will be 'Please press "Enter" to put each step on a new line.'

const TextArea = ({ label, placeholder, register, error, rows = 4, helperText }) => {
  return (
    // div:s, labels and error paragraphs be styled with Tailwind using cohesive classNames
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-gray-700">{label}</label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pop resize-y"
      />

      {/* Soft UX: Gentle guide for the user if provided. With a neat little italic styling */}
      {helperText && (
        <p className="text-gray-500 text-xs mt-1 italic">
          {helperText}
        </p>
      )}

      {/* Hard validation error from Zod */}
      {error && <InlineFormError message={error} />}
    </div>
  );
};

export default TextArea;