import express from 'express';

import ingredientsRouter from './ingredient.routes';
import measurementUnitRouter from './measurementUnit.routes';
import recipeRouter from './recipe.routes';

const routes = express.Router();

routes.use(ingredientsRouter);
routes.use(measurementUnitRouter);
routes.use(recipeRouter);

export default routes;
