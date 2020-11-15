/* eslint-disable no-param-reassign */
export default function errorHandler(error: Error): Error {
  switch (error.message) {
    case 'insert or update on table "recipe_ingredients" violates foreign key constraint "Ingredient"':
      error.message = 'Ingredient does not exist';
      break;
    case 'insert or update on table "recipe_ingredients" violates foreign key constraint "QuantityUnit"':
      error.message = 'Measurement Unit does not exist';
      break;
    default:
      break;
  }

  return error;
}
