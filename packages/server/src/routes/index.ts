import express from 'express';

import ingredientsRouter from './ingredient.routes';

const routes = express.Router();

routes.use(ingredientsRouter);

export default routes;
