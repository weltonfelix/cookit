import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recipe_ingredients')
class RecipeIngredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
