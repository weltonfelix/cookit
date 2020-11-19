/* eslint-disable object-curly-newline */
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import RecipeIngredient from './RecipeIngredient';

@Entity('recipes')
class Recipe {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  picture: string;

  @Column()
  author: string;

  @Column('integer', { name: 'prep_time' })
  prepTime: number;

  @Column('integer')
  stars: number;

  @Column('integer', { name: 'count_rates' })
  countRates: number;

  @Column('text')
  directions: string;

  @OneToMany(
    () => RecipeIngredient,
    recipeIngredient => recipeIngredient.recipe_id,
    { cascade: true }
  )
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  ingredients: RecipeIngredient[];
}

export default Recipe;
