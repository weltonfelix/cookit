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

interface RecipeIngredientQuery {
  id: number;
  recipe_id: Recipe;
}

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

  public async findByIngredients(
    ingredientsArray: string[]
  ): Promise<[RecipesResult[], number] | null> {
    const ingredientsRepository = getRepository(Ingredient);
    const recipeIngredientsRepository = getRepository(RecipeIngredient);

    const ingredients = ingredientsArray.map(ingredient =>
      ingredient.toUpperCase()
    );

    const ingredientsData = await ingredientsRepository
      .createQueryBuilder('ingredients')
      .select('ingredients.id')
      .where('UPPER(ingredients.name) IN (:...name)', {
        name: ingredients,
      })
      .getMany();

    if (!ingredientsData || ingredientsData.length === 0) {
      return [[], 0];
    }

    const ingredientsId = ingredientsData.map(ingredient => ingredient.id);

    const [
      recipeIngredientsData,
      recipesCount,
    ] = await recipeIngredientsRepository
      .createQueryBuilder('recipe_ingredients')
      .where('recipe_ingredients.ingredient_id IN (:...ingredients)', {
        ingredients: ingredientsId,
      })
      .select(['recipe_ingredients.id'])
      .leftJoinAndSelect('recipe_ingredients.recipe_id', 'recipe')
      .getManyAndCount();

    const recipeIngredientQuery = (recipeIngredientsData as unknown) as RecipeIngredientQuery[];

    const recipes = recipeIngredientQuery.map(recipeIngredient => ({
      id: recipeIngredient.recipe_id.id,
      title: recipeIngredient.recipe_id.title,
      picture: recipeIngredient.recipe_id.picture,
      author: recipeIngredient.recipe_id.author,
      prepTime: recipeIngredient.recipe_id.prepTime,
      stars: recipeIngredient.recipe_id.stars,
      countRates: recipeIngredient.recipe_id.countRates,
    }));

    return [recipes, recipesCount];
  }
}

export default RecipesRepository;
