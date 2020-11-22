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

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  @JoinColumn({ name: 'recipe_id', referencedColumnName: 'id' })
  recipe_id: number;

  @ManyToOne(() => Ingredient, ingredient => ingredient.id)
  @JoinColumn({ name: 'ingredient_id', referencedColumnName: 'id' })
  ingredient_id: number;

  @ManyToOne(() => MeasurementUnit, measurementUnit => measurementUnit.id)
  @JoinColumn({ name: 'unit_id', referencedColumnName: 'id' })
  unit_id: number;

  @Column()
  quantity: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RecipeIngredient;
