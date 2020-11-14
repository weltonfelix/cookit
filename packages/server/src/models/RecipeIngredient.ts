import { Column, Entity } from 'typeorm';

@Entity('recipe_ingredients')
class RecipeIngredient {
  @Column('integer')
  recipe_id: number;

  @Column('integer')
  ingredient_id: number;

  @Column('integer')
  unit_id: number;

  @Column()
  quantity: string;
}

export default RecipeIngredient;
