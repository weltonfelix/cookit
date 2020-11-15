/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/camelcase */
import { getRepository } from 'typeorm';

import { CreateRequest } from '../routes/recipe.routes';

import Recipe from '../models/Recipe';
import RecipeIngredient from '../models/RecipeIngredient';

import CreateRecipeIngredientsService from './CreateRecipeIngredientsService';

interface ResponseRecipe extends Recipe {
  ingredients: RecipeIngredient[];
}

class CreateRecipeService {
  public async execute(recipe: CreateRequest): Promise<ResponseRecipe> {
    const recipesRepository = getRepository(Recipe);

    const createRecipeIngredients = new CreateRecipeIngredientsService();

    const {
      title,
      picture,
      author,
      prepTime,
      ingredients,
      directions,
    } = recipe;

    const newRecipe = recipesRepository.create({
      title,
      picture,
      author,
      prep_time: prepTime,
      directions,
    });

    let storedRecipe: Recipe;

    try {
      storedRecipe = await recipesRepository.save(newRecipe);
    } catch (error) {
      throw new Error(error);
    }

    try {
      const storedRecipeIngredients = await createRecipeIngredients.execute(
        storedRecipe.id,
        ingredients
      );

      return {
        ...storedRecipe,
        ingredients: storedRecipeIngredients,
      };
    } catch (error) {
      await recipesRepository.delete(
        (await recipesRepository.findByIds([storedRecipe.id]))[0]
      );

      throw new Error('Ingredient or Measurement Unit does not exist');
    }
  }
}

export default CreateRecipeService;
