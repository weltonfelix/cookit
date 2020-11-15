/* eslint-disable operator-linebreak */
import { Router } from 'express';

import CreateRecipeService from '../services/CreateRecipeService';

const recipeRouter = Router();

export interface NewRecipeIngredient {
  quantity: string;
  unitId: number;
  ingredientId: number;
}

export interface CreateRequest {
  title: string;
  picture: string;
  author: string;
  prepTime: number;
  ingredients: NewRecipeIngredient[];
  directions: string[];
}

recipeRouter.post('/recipe', async (request, response) => {
  try {
    const recipe: CreateRequest = request.body;

    if (
      !recipe.title ||
      !recipe.picture ||
      !recipe.author ||
      !recipe.prepTime ||
      !recipe.ingredients ||
      !recipe.directions
    ) {
      throw new Error('Missing properties');
    }

    const createRecipe = new CreateRecipeService();

    const newRecipe = await createRecipe.execute(recipe);

    return response.json(newRecipe);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default recipeRouter;
