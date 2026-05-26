import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Context, Services & Constants
import { useRecipes } from '../contexts/RecipesContext';
import { uploadImage } from '../services/cloudinaryService';
import { RECIPE_CATEGORIES, RECIPE_AREAS } from '../utils/constants';

// Extracted UI Components
import TextInput from './RecipeCreateComponents/TextInput';
import TextArea from './RecipeCreateComponents/TextArea';
import SelectInput from './RecipeCreateComponents/SelectInput';
import TagInput from './RecipeCreateComponents/TagInput';
import IngredientInputList from './RecipeCreateComponents/IngredientInputList';
import ImageUpload from './RecipeCreateComponents/ImageUpload';

// 1. Adjusted Zod Schema for Editing
const editRecipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  category: z.string().min(1, 'Please select a category'),
  area: z.string().min(1, 'Please select a cuisine area'),
  tags: z.array(z.string()).default([]),
  instructions: z.string().min(10, 'Please write out some instructions'),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, 'Ingredient is required'),
      measure: z.string().min(1, 'Amount is required'),
    })
  ).min(1, 'You need to add at least one ingredient!'),
  
  // THE IMAGE FIX: We now accept EITHER a string (existing URL) OR a new File object
  imageFile: z.any()
    .refine((file) => typeof file === 'string' || file instanceof File, 'An image is required.')
    .refine(
      (file) => typeof file === 'string' || (file instanceof File && file.size <= 3145728), 
      'Image is too large! Maximum size is 3MB.'
    )
});

// Prop drilling with onSaveSuccess is not needed anymore thanks to the new RecipesContext!
export const EditRecipeModal = ({ recipe, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { updateCreated } = useRecipes(); 

  // 2. Pre-fill the form with the existing recipe data
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      title: recipe.title,
      category: recipe.category,
      area: recipe.area,
      tags: recipe.tags || [],
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      imageFile: recipe.imageUrl, // Map the existing URL into the file state
    }
  });

  const onSubmit = async (formData) => {
    setIsUploading(true);
    try {
      // If the user picked a NEW file, upload it. Otherwise, keep the old URL!
      let finalImageUrl = formData.imageFile;
      
      if (formData.imageFile instanceof File) {
        finalImageUrl = await uploadImage(formData.imageFile);
      }

      // Merge the updated data with the original ID and createdAt timestamp
      const updatedRecipe = {
        ...recipe,
        title: formData.title,
        category: formData.category,
        area: formData.area,
        tags: formData.tags,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        imageUrl: finalImageUrl,
      };

      updateCreated(updatedRecipe); // The Context gatekeeper handles the save AND the global re-render
      onClose(); // Close the modal
      
    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to update recipe.');
    } finally {
      setIsUploading(false);
    }
  };

  // 3. The Portal UI
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      
      {/* The actual modal box (scrollable if the form gets too long) */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
        
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-800">Edit Recipe</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 rounded-full p-2"
          >
            ✕
          </button>
        </div>

        {/* The Form Body (Reusing all your amazing components) */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <TextInput 
            label="Recipe Title"
            register={register('title')}
            error={errors.title?.message}
          />

          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-1">
              <SelectInput 
                label="Category"
                options={RECIPE_CATEGORIES}
                register={register('category')}
                error={errors.category?.message}
              />
            </div>
            <div className="flex-1">
              <SelectInput 
                label="Cuisine Area"
                options={RECIPE_AREAS}
                register={register('area')}
                error={errors.area?.message}
              />
            </div>
          </div>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagInput
                label="Custom Tags (Optional)"
                value={field.value}
                onChange={field.onChange}
                error={errors.tags?.message}
              />
            )}
          />

          <IngredientInputList control={control} register={register} errors={errors} />

          <TextArea 
            label="Instructions"
            register={register('instructions')}
            error={errors.instructions?.message}
            rows={6}
          />

          <div className="mb-8">
            <Controller
              name="imageFile"
              control={control}
              render={({ field }) => (
                <ImageUpload 
                  onFileSelect={(file) => field.onChange(file)} 
                  error={errors.imageFile?.message}
                  // Optional: if your ImageUpload component can accept an existing URL to show a preview!
                  existingImage={typeof field.value === 'string' ? field.value : null} 
                />
              )}
            />
          </div>

          <button 
            type="submit" 
            disabled={isUploading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
              isUploading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isUploading ? 'Saving Updates...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );

  // Magic happens here! Render this HTML at the very root of the DOM
  return createPortal(modalContent, document.body);
};