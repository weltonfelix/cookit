/* eslint-disable function-paren-newline */
import { EntityRepository, Repository } from 'typeorm';

import Ingredient from '../models/Ingredient';

@EntityRepository(Ingredient)
class IngredientsRepository extends Repository<Ingredient> {
  public async findByName(name: string): Promise<Ingredient[]> {
    const findIngredient = await this.find();

    const ingredients = findIngredient.filter(ingredient =>
      ingredient.name.toLowerCase().includes(name.toLowerCase())
    );

    return ingredients;
  }
}

export default IngredientsRepository;
