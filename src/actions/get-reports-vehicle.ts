// actions/ReportService.ts
import firestore from '@react-native-firebase/firestore';
import {Report} from '../domain/entities/reports.entity';

export const saveReport = async (report: Report) => {
  try {
    const docRef = await firestore().collection('reports').add(report);
    return docRef.id;
  } catch (error) {
    console.error('Error saving report: ', error);
    throw error;
  }
};
