const SelectInput = ({ label, options, register, error, placeholder }) => {
  return (
    <div>
      <label className="font-semibold text-gray-700">{label}</label>

      {/* Hard validation error from Zod */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SelectInput;