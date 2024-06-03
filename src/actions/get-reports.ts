import firestore from '@react-native-firebase/firestore';
import {ReportMapper} from '../infrastructure/mappers/reports.mapper';
import {Report} from '../domain/entities/report.entity';

export const loadReports = async (): Promise<Report[]> => {
  try {
    const dataSnapshot = await firestore()
      .collection('reports')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const reports = dataSnapshot.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return {id, ...ReportMapper.fromFirestoreData(data)};
    });
    return reports;
  } catch (error) {
    console.error(error);
    throw new Error('Error loading reports');
  }
};

export const loadMoreReports = async (lastDoc: any): Promise<Report[]> => {
  try {
    const dataSnapshot = await firestore()
      .collection('reports')
      .orderBy('createdAt', 'desc')
      .startAfter(lastDoc)
      .limit(5)
      .get();

    const reports = dataSnapshot.docs.map(doc => {
      const data = doc.data();
      return ReportMapper.fromFirestoreData(data);
    });
    return reports;
  } catch (error) {
    console.error(error);
    throw new Error('Error loading more reports');
  }
};
