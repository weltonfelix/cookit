import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('integer')
  prep_time: number;

  @Column('integer')
  stars: number;

  @Column('text', { array: true })
  directions: string[];
}

export default Recipe;
