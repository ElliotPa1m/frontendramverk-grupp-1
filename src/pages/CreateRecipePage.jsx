import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// Context, services, Constants and Helper functions
import { useRecipes } from "../contexts/RecipesContext";
import { uploadImage } from "../services/cloudinaryService";
import { RECIPE_CATEGORIES, RECIPE_AREAS } from "../utils/constants";
import { getCountryFromArea } from "../utils/getCountryFromArea";

// Extracted UI Components
import TextInput from "../components/RecipeCreateComponents/TextInput";
import SelectInput from "../components/RecipeCreateComponents/SelectInput";
import TagInput from "../components/RecipeCreateComponents/TagInput";
import TextArea from "../components/RecipeCreateComponents/TextArea";
import IngredientInputList from "../components/RecipeCreateComponents/IngredientInputList";
import ImageUpload from "../components/RecipeCreateComponents/ImageUpload";
import { HeadingComp } from "../components/General/HeadingComp";
import { ParagraphComp } from "../components/General/ParagraphComp"; // <-- 1. Imported your ParagraphComp!

// Zod Validation Schema
const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  instructions: z.string().min(10, "Please write out some instructions"),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Ingredient is required"),
        measure: z.string().min(1, "Amount is required"),
      }),
    )
    .min(1, "You need to add at least one ingredient!"),
  category: z.string().min(1, "Please select a category"),
  area: z.string().min(1, "Please select a cuisine area"),
  tags: z.array(z.string()).default([]),
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
      ingredients: [{ name: "", measure: "" }],
      title: "",
      instructions: "",
      category: "",
      area: "",
      tags: [],
    },
  });

  // Form Submission Handler
  const onSubmit = async (formData) => {
    setIsUploading(true);
    try {
      const cdnUrl = await uploadImage(formData.imageFile);

      const newRecipe = {
        title: formData.title,
        category: formData.category,
        area: formData.area,
        country: getCountryFromArea(formData.area),
        tags: formData.tags,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        imageUrl: cdnUrl,
        createdAt: new Date().toISOString(),
      };

      addCreated(newRecipe);
      navigate("/my-recipes");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save recipe.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    // 2. The main page container limits width and centers the content
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* 3. Page Header using your custom components */}
      <div className="mb-8 text-center sm:text-left">
        <HeadingComp text={"Create Custom Recipe"} size={"h1"} />
        <ParagraphComp
          text={
            "Fill out the details below to add your own culinary masterpiece to your recipe book!"
          }
        />
      </div>

      {/* 4. Form Container: A sleek card using your global bg-card-bg variable */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 bg-card-bg p-6 sm:p-8 rounded-xl shadow-sm border border-pop/20"
      >
        <TextInput
          label="Recipe Title"
          placeholder="e.g., Nana's Famous Lasagna"
          register={register("title")}
          error={errors.title?.message}
        />

        <div className="flex flex-col md:flex-row gap-4">
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

        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Custom Tags (Optional)"
              placeholder="e.g., MealPrep, Spicy, Quick"
              value={field.value}
              onChange={(newTags) => field.onChange(newTags)}
              error={errors.tags?.message}
            />
          )}
        />

        {/* Subtle divider to separate the big text fields */}
        <hr className="border-t border-pop/20 my-2" />

        <IngredientInputList
          control={control}
          register={register}
          errors={errors}
        />

        <TextArea
          label="Instructions"
          placeholder="Step 1: Boil the pasta...&#10;Step 2: Chop the onions..."
          register={register("instructions")}
          error={errors.instructions?.message}
          rows={6}
          helperText='Please press "Enter" to put each step on a new line.'
        />

        <div className="mt-2">
          <Controller
            name="imageFile"
            control={control}
            render={({ field }) => (
              <ImageUpload
                onFileSelect={(file) => field.onChange(file)}
                error={errors.imageFile?.message}
              />
            )}
          />
        </div>

        {/* 5. Submit Button styled exactly like your Search button */}
        <button
          type="submit"
          disabled={isUploading}
          className="barlow-condensed-regular w-full mt-4 px-10 py-4 rounded-lg bg-button text-white text-xl tracking-wide uppercase shadow-sm hover:brightness-110 active:brightness-95 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isUploading ? "Uploading & Saving..." : "Save Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
