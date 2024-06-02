import {vehicleApi} from '../config/api/vehicleApi';
import {Vehicle} from '../domain/entities/vehicle.entity';
import {VehicleDBVehicleResponse} from '../infrastructure/interfaces/vehicle-db.responses';
import {VehicleMapper} from '../infrastructure/mappers/vehicle.mapper';

// Todo: modificar petición dependiendo del parametro de busqueda de la api
export const getVehicleByVin = async (id: string): Promise<Vehicle> => {
  try {
    const {data} = await vehicleApi<VehicleDBVehicleResponse>(
      `/vehicles?vin=${id}`,
    );
    console.log(data);
    const vehicle = await VehicleMapper.fromVehicleDBEntity(data[0]);
    console.log(vehicle);
    return vehicle;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting vehicle by vin');
  }
};
