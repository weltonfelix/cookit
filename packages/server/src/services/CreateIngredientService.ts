import { getRepository } from 'typeorm';

import Ingredient from '../models/Ingredient';

class CreateIngredientService {
  public async execute(name: string): Promise<Ingredient> {
    const ingredientsRepository = getRepository(Ingredient);

    const checkIngredientExists = await ingredientsRepository.findOne({
      where: { name },
    });

    if (checkIngredientExists) {
      throw new Error('Ingredient already exists');
    }

    const newIngredient = ingredientsRepository.create({
      name,
    });

    const ingredient = await ingredientsRepository.save(newIngredient);

    return ingredient;
  }
}

export default CreateIngredientService;
