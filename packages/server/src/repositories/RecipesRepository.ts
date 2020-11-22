/* eslint-disable function-paren-newline */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Ingredient from '../models/Ingredient';

import Recipe from '../models/Recipe';
import RecipeIngredient from '../models/RecipeIngredient';

interface RecipesResult {
  id: Recipe['id'];
  title: Recipe['title'];
  picture: Recipe['picture'];
  author: Recipe['author'];
  prepTime: Recipe['prepTime'];
  stars: Recipe['stars'];
  countRates: Recipe['countRates'];
}

interface RecipesQuery {
  id: Ingredient['id'];
  name: Ingredient['name'];
  recipe_ingredients: {
    id: RecipeIngredient['id'],
    recipe: RecipesResult,
  }
}

@EntityRepository(Recipe)
class RecipesRepository extends Repository<Recipe> {
  public async findRecipe(recipeId: Recipe['id']): Promise<Recipe | null> {
    const recipesRepository = getRepository(Recipe);

    const recipe = await recipesRepository.findOne(recipeId, {
      relations: ['ingredients', 'ingredients.ingredient', 'ingredients.unit'],

    });

    if (recipe) {
      return {
        ...recipe,
        directions: JSON.parse(recipe.directions),
      };
    }

    return null;
  }

  public async findByIngredients(
    ingredientsArray: string[]
  ): Promise<[RecipesResult[], number] | null> {
    const ingredientsRepository = getRepository(Ingredient);

    const ingredients = ingredientsArray.map(ingredient =>
      ingredient.toUpperCase()
    );

    const recipesQuery = await ingredientsRepository
      .createQueryBuilder('ingredients')
      .leftJoinAndSelect('ingredients.recipe_ingredients', 'recipe_ingredient')
      .leftJoinAndSelect('recipe_ingredient.recipe', 'recipe')
      .where('UPPER(ingredients.name) IN (:...name)', {
        name: ingredients,
      })
      .select([
        'ingredients.id',
        'ingredients.name',
        'recipe_ingredient.id',
        'recipe_ingredient.recipe',
        'recipe.id',
        'recipe.title',
        'recipe.picture',
        'recipe.author',
        'recipe.prepTime',
        'recipe.stars',
        'recipe.countRates',
      ])
      .getMany() as unknown as RecipesQuery[];

    if (!recipesQuery || recipesQuery.length === 0) {
      return [[], 0];
    }

    const recipes = recipesQuery.map(recipe => ({
      id: recipe.recipe_ingredients.recipe.id,
      title: recipe.recipe_ingredients.recipe.title,
      picture: recipe.recipe_ingredients.recipe.picture,
      author: recipe.recipe_ingredients.recipe.author,
      prepTime: recipe.recipe_ingredients.recipe.prepTime,
      stars: recipe.recipe_ingredients.recipe.stars,
      countRates: recipe.recipe_ingredients.recipe.countRates,
    }));

    return [recipes, recipes.length];
  }

  public async rate(recipeId: number, rating: number): Promise<{stars: number, countRates: number}> {
    const recipesRepository = getRepository(Recipe);

    const recipe = await recipesRepository.findOne({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new Error('Recipe not found.');
    }

    await recipesRepository.update(recipe.id, {
      stars: recipe.stars + rating,
      countRates: recipe.countRates + 1,
    });

    return {
      stars: recipe.stars + rating,
      countRates: recipe.countRates + 1,
    };
  }
}

export default RecipesRepository;
