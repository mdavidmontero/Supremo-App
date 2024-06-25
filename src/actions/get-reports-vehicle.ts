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

export const getReport = async (reportId: string) => {
  try {
    const doc = await firestore().collection('reports').doc(reportId).get();
    if (doc.exists) {
      return doc.data() as Report;
    } else {
      throw new Error(`Report with id ${reportId} not found`);
    }
  } catch (error) {
    console.error('Error getting report: ', error);
    throw error;
  }
};
