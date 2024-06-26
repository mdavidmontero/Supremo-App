import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ContainerScreen from '../../components/shared/ContainerScreen';
import {getVehicleByVin} from '../../../actions/get-vehicle';
import {Vehicle} from '../../../types';

const {width, height} = Dimensions.get('window');

const DetailReportScreen = ({route}: any) => {
  const {report} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    loadvehicle();
  }, []);
  const loadvehicle = async () => {
    const data = await getVehicleByVin(report.vin);
    setVehicle(data!);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const renderObservation = ({item}: any) => (
    <View style={styles.observationContainer}>
      <Text style={styles.observationText}>{item.text}</Text>
      <Text style={styles.observationDate}>
        {item.createdAt ? item.createdAt.toDate().toLocaleDateString() : ''}
      </Text>
    </View>
  );

  return (
    <ContainerScreen text="Details Report">
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.label}>Vin</Text>
            <Text style={styles.value}>{report.vin}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{vehicle?.nombreCompleto}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Placa</Text>
            <Text style={styles.value}>{vehicle?.placa}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Modelo</Text>
            <Text style={styles.value}>{vehicle?.modelo}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{report.status}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>Generator Id</Text>
            <Text style={styles.value}>{report.generatorId}</Text>
          </View>
          {report.generator && report.generator.imagen && (
            <Image
              source={{uri: report.generator.imagen}}
              style={styles.generatorImage}
            />
          )}
          <Text style={styles.sectionTitle}>Last Observation</Text>
          <View style={styles.observationContainer}>
            <Text style={styles.observationText}>
              {report.observations[0].text}
            </Text>
            <Text style={styles.observationDate}>
              {report.observations[0].createdAt
                ? report.observations[0].createdAt.toDate().toLocaleDateString()
                : ''}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={handleOpenModal}>
            <Text style={styles.buttonText}>View History</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          visible={modalVisible}
          transparent={true}
          onRequestClose={handleCloseModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Observation History</Text>
              <FlatList
                data={report.observations}
                renderItem={renderObservation}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatlistContainer}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#B2EBF2',
    borderRadius: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  generatorImage: {
    width: '60%',
    height: width * 0.4,
    borderRadius: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    color: '#00ACC1',
  },
  observationContainer: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    width: '100%',
  },
  observationText: {
    fontSize: 16,
    color: 'black',
  },
  observationDate: {
    fontSize: 14,
    color: 'grey',
  },
  flatlistContainer: {
    flexGrow: 1,
    width: '100%',
  },
  historyButton: {
    marginTop: 20,
    backgroundColor: '#00ACC1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: '#00ACC1',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#00ACC1',
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default DetailReportScreen;