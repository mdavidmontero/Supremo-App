import {vehicleApi} from '../config/api/vehicleApi';
import {Vehicle} from '../domain/entities/vehicle.entity';
import {VehicleDBVehicleResponse} from '../infrastructure/interfaces/vehicle-db.responses';
import {VehicleMapper} from '../infrastructure/mappers/vehicle.mapper';

export const getVehicleByVin = async (id: string): Promise<Vehicle> => {
  try {
    const {data} = await vehicleApi<VehicleDBVehicleResponse[]>(
      `/vehicles?vin=${id}`,
    );

    if (!data || data.length === 0) {
      throw new Error('Vehicle not found');
    }

    const vehicle = await VehicleMapper.fromVehicleDBEntity(data[0]);
    return vehicle;
  } catch (error) {
    throw new Error('Error getting vehicle by vin');
  }
};
