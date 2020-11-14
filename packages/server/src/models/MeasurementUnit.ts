import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurement_units')
class MeasurementUnit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: string;
}

export default MeasurementUnit;
