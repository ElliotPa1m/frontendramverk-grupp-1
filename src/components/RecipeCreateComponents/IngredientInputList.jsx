// Will handle the complex dynamic array logic in the two-column Ingedients section
import { useFieldArray } from 'react-hook-form';

const IngedientInputList = ({ control, register, errors }) => { // Props from `useForm()` passed down from the parent. `register` wires up onChange, onBlur, ref etc automatically. `control` is used so that `useFieldArray` has access to the state in the parent component
  const { fields, append, remove } = useFieldArray({ // `fields` are the rows in the list
    control,
    name: "ingredients", // Will map to a Zod schema array in the parent component
  });

  return (
    // div:s, error paragraphs etc are to be styled using Tailwind with cohesive classNames
    <div>
      <label>Ingredients</label>

      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            
            {/* Ingredient Name Input */}
            <div>
              <input
                {...register(`ingredients.${index}.name`)}
                placeholder="Ingredient (e.g. Flour)"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.ingredients?.[index]?.name && (
                <p>
                  {errors.ingredients[index].name.message}
                </p>
              )}
            </div>

            {/* Amount / Measure input */}
            <div>
              {/* The string path (e.g., "ingredients.0.measure") tells RHF exactly which row in the array to update when the user types here. */}
              <input
                {...register(`ingredients.${index}.measure`)}
                placeholder='Amount (e.g. 2 dl)'
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors?.ingredients?.[index]?.measure && (
                <p>
                  {errors.ingredients[index].measure.message}
                </p>
              )}
            </div>

            {/* Remove Row Button (Only show if there is more than 1 ingredient) */}
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
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
        <p>{errors.ingredients.root.message}</p>
      )}

      {/* Add Row Button */}
      <button
        type="button"
        onClick={() => append({ name: "", measure: "" })}
        className="mt-3 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors w-full border border-blue-200"
      >
        + Add Another Ingredient
      </button>
    </div>
  );
};

export default IngedientInputList;