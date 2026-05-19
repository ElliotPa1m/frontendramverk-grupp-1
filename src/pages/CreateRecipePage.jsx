// I already created this in another branch PR so there's gonna be a tiny merge conflict; thankfulyl that other file is completely empty haha

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

// Context & Services
// import { useFavorites } from '../contexts/FavouritesContext';
import { uploadImage } from '../services/cloudinaryService';

// Extracted UI Components
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
  imageFile: z.any().refine((file) => file instanceof File, 'An image is required'),
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
  
  return (
    <div>CreateRecipePage</div>
  )
}

export default CreateRecipePage