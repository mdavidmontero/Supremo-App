import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {RootStackParamList} from '../../navigator/StackNavigator';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';
import {ButtonActions} from '../../components/shared/ButtonActions';
import {Vehicle} from '../../../domain/entities/vehicle.entity';

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

export const ReportScreen: React.FC<ReportScreenProps> = ({
  route,
  navigation,
}) => {
  const {vehicle, generator} = route.params;
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = React.useState<any>([]);
  const [vehicles, setVehicle] = useState<Vehicle>(vehicle);

  const loadData = async () => {
    try {
      const generatorDoc = await firestore()
        .collection('generadores')
        .doc(generator)
        .get();
      if (generatorDoc.exists) {
        setDatos(generatorDoc.data());
        console.log(generatorDoc.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await firestore().collection('reports').add({
        vin: vehicle.vin,
        vehicleId: vehicle.id,
        generatorId: generator,
        observations,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving report: ', error);
    } finally {
      setLoading(false);
    }
  };

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
                <Text style={styles.label}>Vehicle VIN: </Text>
                <Text style={styles.value}>{vehicle.vin}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle Model: </Text>
                <Text style={styles.value}>{vehicle.model}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vehicle Plate: </Text>
                <Text style={styles.value}>{vehicle.licensePlate}</Text>
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
                <Image style={styles.image} source={{uri: datos.imagen}} />
              </View>
              <TextInput
                mode="outlined"
                label="Observations"
                multiline
                numberOfLines={5}
                value={observations}
                onChangeText={setObservations}
                style={styles.input}
              />
              {/* <Button
                mode="contained"
                style={globalStyles.buttonSucces}
                onPress={handleSave}
                loading={loading}>
                Save Report
              </Button> */}

              <ButtonActions
                text="Next"
                onPress={() => {
                  navigation.navigate('Test', {
                    vehicles: vehicles,
                    generator: generator,
                    observations: observations,
                  });
                }}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
    // <ScrollView style={styles.container}>

    // </ScrollView>
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
  imagenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  imgPosition: {
    position: 'absolute',
    bottom: -30,
    left: -20,
  },
  logo: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 3,
  },
});
