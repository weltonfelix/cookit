/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable function-paren-newline */
/* eslint-disable @typescript-eslint/camelcase */
import { getRepository } from 'typeorm';

import { NewRecipeIngredient } from '../routes/recipe.routes';

import RecipeIngredient from '../models/RecipeIngredient';

class CreateRecipeIngredientsService {
  public async execute(
    recipeId: number,
    recipeIngredients: NewRecipeIngredient[]
  ): Promise<RecipeIngredient[]> {
    const recipeIngredientsRepository = getRepository(RecipeIngredient);

    const newRecipeIngredients = recipeIngredients.map(ingredient =>
      recipeIngredientsRepository.create({
        recipe_id: recipeId,
        unit_id: ingredient.unitId,
        ingredient_id: ingredient.ingredientId,
        quantity: ingredient.quantity,
      })
    );

    async function storeRecipeIngredients(
      recipeIngredientsArray: RecipeIngredient[]
    ): Promise<RecipeIngredient[]> {
      const storedIngredients = [];

      for (const recipeIngredient of recipeIngredientsArray) {
        const storedIngredient = await recipeIngredientsRepository.save(
          recipeIngredient
        );
        storedIngredients.push(storedIngredient);
      }

      return storedIngredients;
    }

    const storedRecipeIngredients = await storeRecipeIngredients(
      newRecipeIngredients
    );

    return storedRecipeIngredients;
  }
}

export default CreateRecipeIngredientsService;
