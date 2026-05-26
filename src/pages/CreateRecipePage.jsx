import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Context, services, Constants and Helper functions
import { useRecipes } from '../contexts/RecipesContext';
import { uploadImage } from '../services/cloudinaryService';
import { RECIPE_CATEGORIES, RECIPE_AREAS } from '../utils/constants';
import { getCountryFromArea } from '../utils/getCountryFromArea';

// Extracted UI Components
import TextInput from "../components/RecipeCreateComponents/TextInput";
import SelectInput from "../components/RecipeCreateComponents/SelectInput";
import TagInput from "../components/RecipeCreateComponents/TagInput";
import TextArea from "../components/RecipeCreateComponents/TextArea";
import IngredientInputList from "../components/RecipeCreateComponents/IngredientInputList";
import ImageUpload from "../components/RecipeCreateComponents/ImageUpload";
import { HeadingComp } from "../components/HeadingComp";

// Zod Validation Schema
const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  instructions: z.string().min(10, "Please write out some instructions"),
  // This is the exact array shape the implemented controller in RecipeDetailsPage expects
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient is required"),
        measure: z.string().min(1, "Amount is required"),
      }),
    )
    .min(1, "You need to add at least one ingredient!"),

  // New additions: Category, area and tags
  category: z.string().min(1, "Please select a category"),
  area: z.string().min(1, "Please select a cuisine area"),
  tags: z.array(z.string()).default([]),

  // We check if it's a file AND now also that the size is under 3MB (3 * 1024 * 1024 bytes)
  imageFile: z
    .any()
    .refine((file) => file instanceof File, "An image is required.")
    .refine(
      (file) => file?.size <= 3145728,
      "Image is too large! Maximum size is 3MB.",
    ),
});

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const { addCreated } = useRecipes();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      // Start the form with one empty ingredient row already showing
      ingredients: [{ name: "", measure: "" }],
      title: "",
      instructions: "",
      category: "",
      area: "",
      tags: [], // This will prevent mapping errors befor ethe user adds their first tag
    },
  });

  // Form Submission Handler
  const onSubmit = async (formData) => {
    setIsUploading(true);
    try {
      const cdnUrl = await uploadImage(formData.imageFile);

      const newRecipe = {
        // No crypto.randomUUID() since saveUserRecipe from the service handles that!
        title: formData.title,
        category: formData.category,
        area: formData.area,
        country: getCountryFromArea(formData.area), // Our new helper function!
        tags: formData.tags,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        imageUrl: cdnUrl,
        createdAt: new Date().toISOString(),
      };

      // Updated to use the context function addCreated instead of talking directly to localStorage via the service
      addCreated(newRecipe);

      // Navigate to Own/Favorites Page (which will mount and read the new data, no global context needed) Update: "no global context needed" for this page maybe but it's *not* true for the entire app anymore haha!
      navigate('/my-recipes'); // Updated route
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save recipe.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // Once again; divs, headers and error paragraphs are to be styled with Tailwind with cohesive classNames
    <div>
      <HeadingComp text={"Create Custom Recipe"} size={"h2"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <TextInput
          label="Recipe Title"
          placeholder="e.g., Nana's Famous Lasagna"
          register={register("title")}
          error={errors.title?.message}
        />

        {/* Row for Category and Area side-by-side */}
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="flex-1">
            <SelectInput
              label="Category"
              placeholder="-- Select a Category --"
              options={RECIPE_CATEGORIES}
              register={register("category")}
              error={errors.category?.message}
            />
          </div>

          <div className="flex-1">
            <SelectInput
              label="Cuisine Area"
              placeholder="-- Select an Area --"
              options={RECIPE_AREAS}
              register={register("area")}
              error={errors.area?.message}
            />
          </div>
        </div>

        {/* The Dynamic Tags Component */}
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Custom Tags (Optional)"
              placeholder="e.g., MealPrep, Spicy, Quick"
              value={field.value} // The current array of tags
              onChange={(newTags) => field.onChange(newTags)} // Updates the Form Brain
              error={errors.tags?.message}
            />
          )}
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
          register={register("instructions")}
          error={errors.instructions?.message}
          rows={6}
          helperText='Please press "Enter" to put each step on a new line.'
        />

        {/* Image Upload */}
        <div>
          {/* The Controller is the translator between the "dumb" ImageUpload component and the "smart" Form Brain (React Hook Form) */}
          <Controller
            name="imageFile"
            control={control}
            render={(
              { field }, // "Render whatever UI you want right here, and I'll give you the tools to update the form state." The `field` object contains standard form functions like onChange, onBlur, and value.
            ) => (
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
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
            isUploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:transform active:scale-95"
          }`}
        >
          {isUploading ? "Uploading & Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
