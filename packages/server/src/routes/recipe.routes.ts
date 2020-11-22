/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable operator-linebreak */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { celebrate, Joi } from 'celebrate';

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

recipeRouter.post(
  '/recipe',
  celebrate(
    {
      body: Joi.object().keys({
        title: Joi.string().required(),
        picture: Joi.string().required(),
        author: Joi.string().required(),
        prepTime: Joi.number().positive().required(),
        ingredients: Joi.array()
          .items(
            Joi.object()
              .keys({
                quantity: Joi.string().required(),
                unit_id: Joi.number().positive().required(),
                ingredient_id: Joi.number().positive().required(),
              })
              .required()
          )
          .required(),
        directions: Joi.array().items(Joi.string()).min(1).required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  async (request, response) => {
    try {
      const recipe: Recipe = request.body;

      const createRecipe = new CreateRecipeService();

      const newRecipe = await createRecipe.execute(recipe);

      return response.json(newRecipe);
    } catch (err) {
      const error = errorHandler(err);

      return response.status(400).json({ error: error.message });
    }
  }
);

recipeRouter.get(
  '/recipe/:recipeId',
  celebrate(
    {
      params: Joi.object().keys({
        recipeId: Joi.number().positive().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  async (request, response) => {
    const { recipeId } = request.params;

    const recipesRepository = getCustomRepository(RecipesRepository);

    const recipe = await recipesRepository.findRecipe(Number(recipeId));

    return response.json(recipe);
  }
);

recipeRouter.get(
  '/recipes',
  celebrate({
    query: Joi.object().keys({
      ingredients: Joi.string()
        .custom(value => {
          try {
            JSON.parse(value);
            return value;
          } catch (error) {
            throw new Error('it must be able to be parsed into an Array');
          }
        })
        .custom(value => {
          try {
            if (JSON.parse(value).length < 1) {
              throw new Error();
            }
            return value;
          } catch (error) {
            throw new Error('it should have at least one ingredient');
          }
        })
        .required(),
    }),
  }),
  async (request, response) => {
    const recipesRepository = getCustomRepository(RecipesRepository);
    try {
      const { ingredients } = request.query;

      const recipeIngredients = JSON.parse(String(ingredients));

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
  }
);

recipeRouter.post(
  '/recipe/:recipeId/rate',
  celebrate(
    {
      params: Joi.object().keys({
        recipeId: Joi.number().positive().required(),
      }),
      body: Joi.object().keys({
        rating: Joi.number().positive().max(10).required(),
      }),
    },
    { abortEarly: false }
  ),
  async (request, response) => {
    try {
      const { recipeId } = request.params;

      const { rating } = request.body;

      const starsRating = Number(rating);

      const recipesRepository = getCustomRepository(RecipesRepository);

      const { stars, countRates } = await recipesRepository.rate(
        Number(recipeId),
        starsRating
      );

      return response.json({ stars, countRates });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

export default recipeRouter;
