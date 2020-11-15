/* eslint-disable @typescript-eslint/camelcase */
import { getRepository } from 'typeorm';

import Recipe from '../models/Recipe';

class CreateRecipeService {
  public async execute(recipe: Recipe): Promise<Recipe> {
    const recipesRepository = getRepository(Recipe);

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
      prepTime,
      ingredients,
      directions: JSON.stringify(directions),
    });

    const storedRecipe = await recipesRepository.save(newRecipe);

    return {
      ...storedRecipe,
      directions: JSON.parse(storedRecipe.directions),
    };
  }
}

export default CreateRecipeService;
