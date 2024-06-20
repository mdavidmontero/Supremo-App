import {Vehicle} from '../../domain/entities/vehicle.entity';
import {VehicleDBVehicleResponse} from '../interfaces/vehicle-db.responses';

export class VehicleMapper {
  static async fromVehicleDBEntity(
    data: VehicleDBVehicleResponse,
  ): Promise<Vehicle> {
    return {
      id: data.id,
      model: data.modelo,
      year: data.anio,
      licensePlate: data.placa,
      color: data.color,
      vin: data.vin,
    };
  }
}
