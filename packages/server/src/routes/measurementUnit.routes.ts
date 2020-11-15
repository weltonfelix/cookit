import { Router } from 'express';
import { getRepository } from 'typeorm';

import MeasurementUnit from '../models/MeasurementUnit';

import CreateMeasurementUnitService from '../services/CreateMeasurementUnitService';

const measurementUnitRouter = Router();

measurementUnitRouter.post('/measurementunit', async (request, response) => {
  try {
    const { name, quantity } = request.body;

    if (!name) {
      throw new Error('Measurement Unit name must be provided');
    }

    const createMeasurementUnit = new CreateMeasurementUnitService();

    const measurementUnit = await createMeasurementUnit.execute({
      name,
      quantity,
    });

    return response.json(measurementUnit);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

measurementUnitRouter.get('/measurementunit', async (request, response) => {
  const measurementUnitsRepository = getRepository(MeasurementUnit);

  const measurementUnits = await measurementUnitsRepository.find();

  return response.json(measurementUnits);
});

export default measurementUnitRouter;
