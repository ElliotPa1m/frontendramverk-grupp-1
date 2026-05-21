// I already created this in another branch PR so there's gonna be a tiny merge conflict; thankfulyl that other file is completely empty haha
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

// Services
import { saveUserRecipe } from '../services/userRecipeService';
import { uploadImage } from '../services/cloudinaryService';

// Extracted UI Components
import TextInput from '../components/RecipeCreateComponents/TextInput';
import TextArea from '../components/RecipeCreateComponents/TextArea';
import IngredientInputList from '../components/RecipeCreateComponents/IngredientInputList';
import ImageUpload from '../components/RecipeCreateComponents/ImageUpload';


// Zod Validation Schema
const recipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  instructions: z.string().min(10, 'Please write out some instructions'),
  // This is the exact array shape the implemented controller in RecipeDetailsPage expects
  ingredients: z.array(
    z.object({
      name: z.string().min(1, 'Ingredient is required'),
      measure: z.string().min(1, 'Amount is required'),
    })
  ).min(1, 'You need to add at least one ingredient!'),

  // We check if it's a file AND now also that the size is under 3MB (3 * 1024 * 1024 bytes)
  imageFile: z.any()
    .refine((file) => file instanceof File, 'An image is required.')
    .refine((file) => file?.size <= 3145728, 'Image is too large! Maximum size is 3MB.')
});

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);

  // React Hook Form initialization
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      // Start the form with one empty ingredient row already showing
      ingredients: [{ name: "", measure: "" }]
    }
  });

  // Form Submission Handler
  const onSubmit = async (formData) => {
    setIsUploading(true);
    try {
      const cdnUrl = await uploadImage(formData.imageFile);

      const newRecipe = {
        // No crypto.randomUUID() since saveUserRecipe from the service handles that!
        title: formData.title,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        imageUrl: cdnUrl,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage using service module
      saveUserRecipe(newRecipe);

      // Navigate to Own/Favorites Page (which will mount and read the new data, no global context needed)
      navigate('/saved');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to save recipe.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // Once again; divs, headers and error paragraphs are to be styled with Tailwind with cohesive classNames
    <div>
      <h2>Create Custom Recipe</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <TextInput
          label="Recipe Title"
          placeholder="e.g., Nana's Famous Lasagna"
          register={register('title')}
          error={errors.title?.message}
        />

        {/* Dynamic Ingredients List */}
        <IngredientInputList
          control={control}
          register={register}
          errors={errors}
        />

        {/* Instructions */}
        <TextArea
          label="Instructions"
          placeholder="Step 1: Boil the pasta...&#10;Step 2: Chop the onions..."
          register={register('instructions')}
          error={errors.instructions?.message}
          rows={6}
          helperText='Please press "Enter" to put each step on a new line.'
        />

        {/* Image Upload */}
        <div>
          {/* The Controller is the translator between the "dumb" ImageUpload component and the "smart" Form Brain (React Hook Form) */}
          <Controller
            name='imageFile'
            control={control}
            render={({ field }) => ( // "Render whatever UI you want right here, and I'll give you the tools to update the form state." The `field` object contains standard form functions like onChange, onBlur, and value.
              <ImageUpload
                onFileSelect={(file) => field.onChange(file)}
                error={errors.imageFile?.message}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${isUploading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
            }`}
        >
          {isUploading ? 'Uploading & Saving...' : 'Save Recipe'}
        </button>

      </form>
    </div>
  );
};

export default CreateRecipePage;
