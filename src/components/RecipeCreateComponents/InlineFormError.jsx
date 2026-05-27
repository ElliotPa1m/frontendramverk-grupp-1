export const InlineFormError = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-red-500 text-sm mt-1 font-medium">
      {message}
    </p>
  );
};