import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
import {getVehicleByVin} from '../../../actions/get-vehicle-by-vin';
import {Vehicle} from '../../../domain/entities/vehicle.entity';
import {DetailsVehicle} from '../../components/ui/DetailsVehicle';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {GeneratorList} from '../../components/ui/GeneratorList';

export const RepairsScreen = () => {
  const [vim, setVim] = useState('');
  const [selectedGeneratorId, setSelectedGeneratorId] = useState(null);
  const [data, setData] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleSearch = (text: string) => {
    setVim(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!vim) {
        setData(null);
        return;
      }
      setLoading(true);
      try {
        const vehicle = await getVehicleByVin(vim);
        setData(vehicle);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [vim]);

  const handleProceed = () => {
    if (data && selectedGeneratorId) {
      navigation.navigate('ReportScreen', {
        vehicle: data,
        generator: selectedGeneratorId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        <Icon name="menu-outline" size={30} color="#900" />
      </Pressable>
      <View style={styles.topCircle}>
        <Text style={styles.title}>Repairs</Text>
      </View>
      <ScrollView style={styles.containerForm}>
        <Text style={styles.text}>Escriba el VIM del Vehiculo</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Numero VIM"
          theme={{colors: {primary: '#00ACC1'}}}
          left={
            <TextInput.Icon
              icon={() => <Icon name="search-outline" size={20} color="#000" />}
            />
          }
          value={vim}
          onChangeText={handleSearch}
        />
        {data && (
          <DetailsVehicle
            color={data?.color}
            model={data?.model}
            plate={data?.licensePlate}
            vim={data?.vin}
            year={data?.year}
            isVisible={!!data && !loading}
          />
        )}

        <GeneratorList onSelect={setSelectedGeneratorId} />
        {selectedGeneratorId && (
          <Text style={styles.selectedText}>
            Selected Generator ID: {selectedGeneratorId}
          </Text>
        )}
        <Button
          mode="contained"
          onPress={handleProceed}
          disabled={
            !data ||
            !(
              <Button
                mode="contained"
                onPress={handleProceed}
                disabled={!data || !selectedGeneratorId}>
                Proceed to Report
              </Button>
            )
          }>
          Proceed to Report
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    bottom: 70,
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
  menuIconContainer: {
    position: 'absolute',
    top: 15,
    left: 13,
    zIndex: 1,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginTop: -height * 0.16,
    marginBottom: 50,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  generatorListContainer: {
    marginTop: 100,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});
