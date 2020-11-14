import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredients')
class Ingredient {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default Ingredient;
