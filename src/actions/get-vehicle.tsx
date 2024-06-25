import firestore from '@react-native-firebase/firestore';
import {Vehicle} from '../types';

export const getVehicleByVin = async (
  vehicleVin: string,
): Promise<Vehicle | null | undefined> => {
  try {
    const vehicleDoc = await firestore()
      .collection('vehicles')
      .doc(vehicleVin)
      .get();

    if (vehicleDoc.exists) {
      const vehicleData = vehicleDoc.data();
      if (vehicleData) {
        return {
          cedula: vehicleData.cedula,
          nombreCompleto: vehicleData.nombreCompleto,
          placa: vehicleData.placa,
          vin: vehicleData.vin,
          modelo: vehicleData.modelo,
        };
      }
    } else {
      console.warn(`Vehicle with VIN ${vehicleVin} not found`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching vehicle with VIN ${vehicleVin}: `, error);
    return null;
  }
  return undefined;
};
