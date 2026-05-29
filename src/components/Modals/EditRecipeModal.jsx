import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Context, Services & Constants
import { useRecipes } from "../../contexts/RecipesContext";
import { uploadImage } from "../../services/cloudinaryService";
import { RECIPE_CATEGORIES, RECIPE_AREAS } from "../../utils/constants";

// Extracted UI Components
import TextInput from "../RecipeCreateComponents/TextInput";
import TextArea from "../RecipeCreateComponents/TextArea";
import SelectInput from "../RecipeCreateComponents/SelectInput";
import TagInput from "../RecipeCreateComponents/TagInput";
import IngredientInputList from "../RecipeCreateComponents/IngredientInputList";
import ImageUpload from "../RecipeCreateComponents/ImageUpload";

// 1. Adjusted Zod Schema for Editing
const editRecipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string().min(1, "Please select a category"),
  area: z.string().min(1, "Please select a cuisine area"),
  tags: z.array(z.string()).default([]),
  instructions: z.string().min(10, "Please write out some instructions"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient is required"),
        measure: z.string().min(1, "Amount is required"),
      }),
    )
    .min(1, "You need to add at least one ingredient!"),

  // THE IMAGE FIX: We now accept EITHER a string (existing URL) OR a new File object
  imageFile: z
    .any()
    .refine(
      (file) => typeof file === "string" || file instanceof File,
      "An image is required.",
    )
    .refine(
      (file) =>
        typeof file === "string" ||
        (file instanceof File && file.size <= 3145728),
      "Image is too large! Maximum size is 3MB.",
    ),
});

// Prop drilling with onSaveSuccess is not needed anymore thanks to the new RecipesContext!
export const EditRecipeModal = ({ recipe, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { updateCreated } = useRecipes();

  // 2. Pre-fill the form with the existing recipe data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editRecipeSchema),
    defaultValues: {
      title: recipe.title,
      category: recipe.category,
      area: recipe.area,
      tags: recipe.tags || [],
      instructions: recipe.instructions,
      ingredients: recipe.ingredients,
      imageFile: recipe.imageUrl, // Map the existing URL into the file state
    },
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
      alert(err.message || "Failed to update recipe.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. The Portal UI
  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity">
      {/* The actual modal box using bg-card-bg to match the rest of the app */}
      <div className="bg-card-bg rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border border-pop/20">
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 bg-card-bg border-b border-pop/20 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="barlow-condensed-regular text-3xl text-text">
            Edit Recipe
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-button transition-colors bg-white hover:bg-card-pop rounded-full w-8 h-8 flex items-center justify-center shadow-sm border border-gray-200"
          >
            ✕
          </button>
        </div>

        {/* The Form Body (Reusing all of our components) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-6 sm:p-8"
        >
          <TextInput
            label="Recipe Title"
            register={register("title")}
            error={errors.title?.message}
          />
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SelectInput
                label="Category"
                options={RECIPE_CATEGORIES}
                register={register("category")}
                error={errors.category?.message}
              />
            </div>
            <div className="flex-1">
              <SelectInput
                label="Cuisine Area"
                options={RECIPE_AREAS}
                register={register("area")}
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

          <hr className="border-t border-pop/20 my-2" />

          <IngredientInputList
            control={control}
            register={register}
            errors={errors}
          />

          <TextArea
            label="Instructions"
            register={register("instructions")}
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
                  // If our ImageUpload component can accept an existing URL to show a preview!
                  existingImage={
                    typeof field.value === "string" ? field.value : null
                  }
                />
              )}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="barlow-condensed-regular w-full mt-4 px-10 py-4 rounded-lg bg-button text-white text-xl tracking-wide uppercase shadow-sm hover:brightness-110 active:brightness-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isUploading ? "Saving Updates..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );

  // The magic happens here! Render this HTML at the very root of the DOM
  return createPortal(modalContent, document.body);
};
