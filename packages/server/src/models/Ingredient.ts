import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import RecipeIngredient from './RecipeIngredient';

@Entity('ingredients')
class Ingredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => RecipeIngredient,
    recipeIngredient => recipeIngredient.ingredient
  )
  @JoinColumn({ name: 'id' })
  recipe_ingredients: RecipeIngredient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Ingredient;
