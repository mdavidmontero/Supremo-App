import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {ContainerScreen} from '../../components/shared/ContainerScreen';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Report} from '../../../domain/entities/report.entity';
import {Generator} from '../../../infrastructure/interfaces/generator-db.response';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {ActivityIndicator} from 'react-native-paper';

type RootStackParamList = {
  DetailReportScreen: {report: Report};
};

export const ListReportsScreen: FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportList: any[] = [];
        const querySnapshot = await firestore()
          .collection('reports')
          .orderBy('createdAt', 'desc')
          .get();
        const generatorPromises: Promise<Generator | null>[] = [];

        querySnapshot.forEach(documentSnapshot => {
          const reportData = documentSnapshot.data() as Report;
          const id = documentSnapshot.id;
          const generatorId = reportData.generatorId;

          const generatorPromise = firestore()
            .collection('generadores')
            .doc(generatorId)
            .get()
            .then(generatorDoc => {
              if (generatorDoc.exists) {
                return {
                  id: generatorDoc.id,
                  ...generatorDoc.data(),
                } as Generator;
              } else {
                console.warn(`Generator with id ${generatorId} not found`);
                return null;
              }
            })
            .catch(error => {
              throw new Error(
                `Error fetching generator with id ${generatorId}: `,
              );
              return null;
            });

          generatorPromises.push(generatorPromise);
          reportList.push({id, ...reportData} as any);
        });
        const generators = await Promise.all(generatorPromises);

        reportList.forEach((report, index) => {
          report.generator = generators[index];
        });

        setReports(reportList);
      } catch (error) {
        throw new Error(`Error fetching reports:  ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleReportPress = (report: Report) => {
    navigation.navigate('DetailReportScreen', {report});
  };

  const renderItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleReportPress(item)}>
      {item.generator && (
        <FadeInImage uri={item.generator.imagen} style={styles.image} />
      )}
      <Text style={styles.title}>VIN:{item.vin}</Text>
      <Text style={styles.subtitle}>Estado: {item.status}</Text>
      <Text style={styles.subtitle}>
        Observation: {item.observations[0].text}
      </Text>
    </TouchableOpacity>
  );

  const filteredReports = reports.filter(
    report =>
      (filter === 'all' || report.status === filter) &&
      report.vin.toLowerCase().includes(search.toLowerCase()),
  );

  // if (loading) {
  //   return (

  //   );
  // }

  return (
    <View style={styles.container}>
      <ContainerScreen text="Reports">
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'all' && styles.activeFilter,
            ]}
            onPress={() => setFilter('all')}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'pending' && styles.activeFilter,
            ]}
            onPress={() => setFilter('pending')}>
            <Text style={styles.filterText}>Pending</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'completed' && styles.activeFilter,
            ]}
            onPress={() => setFilter('completed')}>
            <Text style={styles.filterText}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'cancelled' && styles.activeFilter,
            ]}
            onPress={() => setFilter('cancelled')}>
            <Text style={styles.filterText}>Cancelled</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#c2c2c2"
          placeholder="Search by VIN"
          value={search}
          onChangeText={setSearch}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <Text>
              <ActivityIndicator size="large" color="#00ACC1" />{' '}
            </Text>
          </View>
        )}
        <View style={styles.columnContainer}>
          <FlatList
            data={filteredReports}
            renderItem={renderItem}
            keyExtractor={item => item.ids}
            contentContainerStyle={styles.flatlistContainer}
          />
        </View>
      </ContainerScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#B2EBF2',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    borderColor: '#00ACC1',
    borderWidth: 0.8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#00ACC1',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  image: {
    width: '60%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: '#B2EBF2',
  },
  activeFilter: {
    backgroundColor: '#00ACC1',
  },
  filterText: {
    fontSize: 16,
    color: '#555555',
  },
  searchInput: {
    height: 40,
    borderColor: '#00ACC1',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    color: '#000',
  },
});

export default ListReportsScreen;
