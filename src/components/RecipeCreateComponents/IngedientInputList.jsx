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

          </div>
        ))}
      </div>
    </div>
  )
}

export default IngedientInputList