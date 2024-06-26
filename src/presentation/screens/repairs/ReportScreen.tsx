import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';
import {ButtonActions} from '../../components/shared/ButtonActions';
import {Vehicle} from '../../../domain/entities/vehicle.entity';
import {RootStackParamList} from '../../navigator/StackNavigator';
import PreviousObservationsList from '../../components/ui/ListObservations';
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');

type ReportScreenRouteProp = RouteProp<RootStackParamList, 'ReportScreen'>;

type ReportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ReportScreen'
>;

type ReportScreenProps = {
  route: ReportScreenRouteProp;
  navigation: ReportScreenNavigationProp;
};

export const ReportScreen = ({route, navigation}: ReportScreenProps) => {
  const {vehicle, generator} = route.params;
  const [observations, setObservations] = useState('');
  const [datos, setDatos] = useState<any>({});
  const [previousObservations, setPreviousObservations] = useState<any[]>([]);
  const [status, setStatus] = useState('pending');

  const loadData = async () => {
    try {
      const generatorQuerySnapshot = await firestore()
        .collection('generadores')
        .where('id', '==', generator)
        .get();
      if (!generatorQuerySnapshot.empty) {
        const generatorDoc = generatorQuerySnapshot.docs[0];
        setDatos(generatorDoc.data());
      } else {
        console.log('No such document!');
      }

      const reportsQuerySnapshot = await firestore()
        .collection('reports')
        .where('vin', '==', vehicle.vin)
        .get();
      const reports = reportsQuerySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPreviousObservations(reports);
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <ImagenPosition style={styles.imgPosition} />
        <Pressable
          style={styles.menuIconContainer}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
        </Pressable>
        <View style={styles.topCircle}>
          <Title text="Reports" />
        </View>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.containerForm}>
              <Text style={styles.title}>Vehicle Report</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre: </Text>
                <Text style={styles.value}>{vehicle.nombreCompleto}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle VIN: </Text>
                <Text style={styles.value}>{vehicle.vin}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle Model: </Text>
                <Text style={styles.value}>{vehicle.modelo}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle Plate: </Text>
                <Text style={styles.value}>{vehicle.placa}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Generator Name: </Text>
                <Text style={styles.value}>{datos.nombre}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Generator Description: </Text>
                <Text style={styles.value}>{datos.descripcion}</Text>
              </View>
              <View style={styles.imagenContainer}>
                {datos.imagen ? (
                  <Image style={styles.image} source={{uri: datos.imagen}} />
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </View>

              <PreviousObservationsList observations={previousObservations} />
              <TextInput
                mode="outlined"
                label="Observations"
                multiline
                numberOfLines={5}
                value={observations}
                onChangeText={setObservations}
                style={styles.input}
              />
              <Text style={styles.label}>Status: </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  mode="dropdown"
                  selectedValue={status}
                  enabled={true}
                  onValueChange={itemValue => setStatus(itemValue)}
                  style={styles.picker}>
                  <Picker.Item label="Pending" value="pending" />
                  <Picker.Item label="Cancelled" value="cancelled" />
                  <Picker.Item label="Completed" value="completed" />
                </Picker>
              </View>
              <ButtonActions
                text="Next"
                onPress={() => {
                  navigation.navigate('Test', {
                    vehicles: vehicle,
                    generator: generator,
                    observations: observations,
                    previousObservations: previousObservations,
                    status: status,
                  });
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  menuIconContainer: {
    position: 'absolute',
    top: 15,
    left: 13,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: -height * 0.15,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  topCircle: {
    width: width,
    height: height * 0.3,
    backgroundColor: '#00ACC1',
    borderBottomLeftRadius: width / 3,
    borderBottomRightRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#B2EBF2',
    borderRadius: 30,
    padding: 20,
    marginBottom: 50,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ACC1',
    borderStyle: 'solid',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    color: 'black',
    alignItems: 'center',
    borderStyle: 'solid',
    textAlign: 'center',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#00ACC1',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
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
  input: {
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    backgroundColor: '#D9D9D9',
    elevation: 2,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#555',
    fontSize: 16,
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    borderRadius: 20,
  },
  imagenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgPosition: {
    position: 'absolute',
    top: -10,
    right: 0,
  },
  logo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default ReportScreen;
