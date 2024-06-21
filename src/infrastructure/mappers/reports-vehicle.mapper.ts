// mappers/ReportMapper.ts

import {Report} from '../../domain/entities/reports.entity';

export const mapToReport = (
  vehicles: any, //Todo: Agregar Interface para tipar
  generator: string,
  observations: string,
  stepData: {step1: string; step2: string; step3: string},
): Report => {
  return {
    vin: vehicles.vin,
    vehicleId: vehicles.id,
    generatorId: generator,
    observations: [{text: observations, createdAt: new Date()}],
    status: 'pending',
    step1: stepData.step1,
    step2: stepData.step2,
    step3: stepData.step3,
    createdAt: new Date(),
  };
};
