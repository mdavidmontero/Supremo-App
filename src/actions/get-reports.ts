import firestore from '@react-native-firebase/firestore';
import {ReportMapper} from '../infrastructure/mappers/reports.mapper';
import {Report} from '../domain/entities/report.entity';

const getGeneratorById = async (generatorId: string) => {
  try {
    const generatorDoc = await firestore()
      .collection('generadores')
      .doc(generatorId)
      .get();
    if (generatorDoc.exists) {
      return generatorDoc.data();
    } else {
      console.warn(`Generator with id ${generatorId} not found`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching generator with id ${generatorId}: `, error);
    return null;
  }
};

export const loadReports = async (): Promise<Report[]> => {
  try {
    const dataSnapshot = await firestore()
      .collection('reports')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const reports = await Promise.all(
      dataSnapshot.docs.map(async doc => {
        const data = doc.data();
        const id = doc.id;
        const generatorData = await getGeneratorById(data.generatorId);
        return {
          id,
          ...ReportMapper.fromFirestoreData(data),
          generator: generatorData,
        };
      }),
    );

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

    const reports = await Promise.all(
      dataSnapshot.docs.map(async doc => {
        const data = doc.data();
        const generatorData = await getGeneratorById(data.generatorId);
        return {
          ...ReportMapper.fromFirestoreData(data),
          generator: generatorData,
        };
      }),
    );

    return reports;
  } catch (error) {
    console.error(error);
    throw new Error('Error loading more reports');
  }
};
