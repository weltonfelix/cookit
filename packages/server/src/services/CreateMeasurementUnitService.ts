import { getRepository } from 'typeorm';

import MeasurementUnit from '../models/MeasurementUnit';

interface Request {
  name: string;
  quantity: string;
}

class CreateMeasurementUnitService {
  public async execute({
    name,
    quantity,
  }: Request): Promise<MeasurementUnit | null> {
    const measurementUnitsRepository = getRepository(MeasurementUnit);

    const possibleQuantities = ['Massa', 'Volume'];

    const checkMeasurementUnitExists = await measurementUnitsRepository.findOne(
      {
        where: { name },
      }
    );

    if (checkMeasurementUnitExists) {
      throw new Error('Measurement Unit already exists');
    }

    if (quantity && !possibleQuantities.includes(quantity)) {
      throw new Error('Invalid quantity');
    }

    const newMeasurementUnit = measurementUnitsRepository.create({
      name,
      quantity,
    });

    const measurementUnit = await measurementUnitsRepository.save(
      newMeasurementUnit
    );

    return measurementUnit;
  }
}

export default CreateMeasurementUnitService;
