// Will handle the complex dynamic array logic in the two-column Ingedients section
import { useFieldArray } from 'react-hook-form';

const IngedientInputList = ({ control, register, errors }) => { // Props from `useForm()` passed down from the parent. `register` wires up onChange, onBlur, ref etc automatically. `control` is used so that `useFieldArray` has access to the state in the parent component
  const { fields, append, remove } = useFieldArray({ // `fields` are the rows in the list
    control,
    name: "ingredients", // Will map to a Zod schema array in the parent component
  });

  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold text-gray-700">Ingredients</label>

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col sm:flex-row gap-2 items-start">
            
            {/* Ingredient Name Input */}
            <div className="w-full sm:w-1/2">
              <input
                {...register(`ingredients.${index}.name`)}
                placeholder="Ingredient (e.g. Flour)"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pop"
              />
              {errors?.ingredients?.[index]?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index].name.message}
                </p>
              )}
            </div>

            {/* Amount / Measure input */}
            <div className="w-full sm:w-1/2 flex gap-2">
              {/* The string path (e.g., "ingredients.0.measure") tells RHF exactly which row in the array to update when the user types here. */}
              <input
                {...register(`ingredients.${index}.measure`)}
                placeholder='Amount (e.g. 2 dl)'
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pop"
              />
              {errors?.ingredients?.[index]?.measure && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ingredients[index].measure.message}
                </p>
              )}
            </div>

            {/* Remove Row Button (Only show if there is more than 1 ingredient) */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200"
                title="Remove ingredient"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Global error (e.g., if Zod blocks submission because 0 ingredients exist) */}
      {errors?.ingredients?.root && (
        <p className="text-red-500 text-sm mt-1">{errors.ingredients.root.message}</p>
      )}

      {/* Add Row Button */}
      <button
        type="button"
        onClick={() => append({ name: "", measure: "" })}
        className="mt-2 px-4 py-2 text-sm font-semibold text-pop bg-card-pop rounded-md hover:brightness-95 transition-colors w-full border border-pop/20"
      >
        + Add Another Ingredient
      </button>
    </div>
  );
};

export default IngedientInputList;