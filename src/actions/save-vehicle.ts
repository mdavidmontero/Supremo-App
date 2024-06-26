import firestore from '@react-native-firebase/firestore';
import {Vehicle} from '../types';

export const saveVehicle = async (vehicle: Vehicle) => {
  try {
    const vehicleRef = firestore().collection('vehicles').doc(vehicle.vin);
    const vehicleDoc = await vehicleRef.get();

    if (!vehicleDoc.exists) {
      await vehicleRef.set(vehicle);
    }

    return vehicle.vin;
  } catch (error) {
    console.error('Error saving vehicle: ', error);
    throw error;
  }
};
