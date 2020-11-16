import { EntityRepository, getRepository, Repository } from 'typeorm';

import Recipe from '../models/Recipe';
import RecipeIngredient from '../models/RecipeIngredient';

@EntityRepository(Recipe)
class RecipesRepository extends Repository<Recipe> {
  public async findRecipe(recipeId: Recipe['id']): Promise<Recipe | null> {
    const recipesRepository = getRepository(Recipe);
    const recipeIngredientsRepository = getRepository(RecipeIngredient);

    const recipe = await recipesRepository.findOne(recipeId, {
      relations: ['ingredients'],
    });

    if (recipe) {
      const recipeIngredients = await recipeIngredientsRepository.findByIds(
        recipe.ingredients.map(recipeIngredient => recipeIngredient.id),
        {
          relations: ['ingredient_id', 'unit_id'],
        }
      );

      return {
        ...recipe,
        directions: JSON.parse(recipe.directions),
        ingredients: {
          ...recipeIngredients,
        },
      };
    }

    return null;
  }
}

export default RecipesRepository;
