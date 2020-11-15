import express from 'express';

import ingredientsRouter from './ingredient.routes';
import measurementUnitRouter from './measurementUnit.routes';

const routes = express.Router();

routes.use(ingredientsRouter);
routes.use(measurementUnitRouter);

export default routes;
