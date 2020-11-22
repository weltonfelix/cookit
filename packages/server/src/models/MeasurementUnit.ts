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

@Entity('measurement_units')
class MeasurementUnit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.unit)
  @JoinColumn({ name: 'id' })
  recipeIngredients: RecipeIngredient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default MeasurementUnit;
