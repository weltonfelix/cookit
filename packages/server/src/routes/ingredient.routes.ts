import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { celebrate, Joi } from 'celebrate';

import IngredientsRepository from '../repositories/IngredientsRepository';

import CreateIngredientService from '../services/CreateIngredientService';

const ingredientsRouter = Router();

ingredientsRouter.post(
  '/ingredient',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  async (request, response) => {
    try {
      const { name } = request.body;

      const createIngredient = new CreateIngredientService();

      const ingredient = await createIngredient.execute(name);

      return response.json(ingredient);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

ingredientsRouter.get(
  '/ingredient',
  celebrate({
    query: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  async (request, response) => {
    try {
      const { name } = request.query;

      const ingredientsRepository = getCustomRepository(IngredientsRepository);

      const ingredients = await ingredientsRepository.findByName(String(name));

      return response.json(ingredients);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
);

export default ingredientsRouter;
