/* eslint-disable operator-linebreak */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import Recipe from '../models/Recipe';

import RecipesRepository from '../repositories/RecipesRepository';

import CreateRecipeService from '../services/CreateRecipeService';

import errorHandler from '../util/errorHandler';

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
    const recipe: Recipe = request.body;

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
  } catch (err) {
    const error = errorHandler(err);

    return response.status(400).json({ error: error.message });
  }
});

recipeRouter.get('/recipe/:recipeId', async (request, response) => {
  const { recipeId } = request.params;

  const recipesRepository = getCustomRepository(RecipesRepository);

  const recipe = await recipesRepository.findRecipe(Number(recipeId));

  return response.json(recipe);
});

recipeRouter.get('/recipes', async (request, response) => {
  const recipesRepository = getCustomRepository(RecipesRepository);
  try {
    const { ingredients } = request.query;

    if (!ingredients) {
      throw new Error('Ingredients must be provided');
    }
    const recipeIngredients = JSON.parse(String(ingredients));

    if (recipeIngredients.length === 0) {
      throw new Error('Ingredients must be provided');
    }

    const results = await recipesRepository.findByIngredients(
      recipeIngredients
    );

    const recipes = {
      recipes: results && results[0],
      recipesCount: results && results[1],
    };

    return response.json(recipes);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default recipeRouter;
