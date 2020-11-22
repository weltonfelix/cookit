/* eslint-disable object-curly-newline */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Ingredient from './Ingredient';
import MeasurementUnit from './MeasurementUnit';
import Recipe from './Recipe';

@Entity('recipe_ingredients')
class RecipeIngredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  recipe_id: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @Column('integer')
  ingredient_id: number;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column('integer')
  unit_id: number;

  @ManyToOne(() => MeasurementUnit)
  @JoinColumn({ name: 'unit_id' })
  unit: number;

  @Column()
  quantity: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RecipeIngredient;
