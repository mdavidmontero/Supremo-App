import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  ActivityIndicator,
  Button,
  TextInput,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {getVehicleByVin} from '../../../actions/get-vehicle-by-vin';
import {Vehicle} from '../../../domain/entities/vehicle.entity';
import {DetailsVehicle} from '../../components/ui/DetailsVehicle';
import {useNavigation} from '@react-navigation/native';
import {GeneratorList} from '../../components/ui/GeneratorList';
import {globalStyles} from '../../../config/theme/theme';
import {RootStackParamList} from '../../navigator/StackNavigator';
import ContainerScreen from '../../components/shared/ContainerScreen';

export const RepairsScreen = () => {
  const [vim, setVim] = useState('');
  const [selectedGeneratorId, setSelectedGeneratorId] = useState(null);
  const [data, setData] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<RootStackParamList>();
  const handleSearch = (text: string) => {
    setVim(text);
  };
  const {colors} = useTheme();

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
      }) as any;
    }
  };

  return (
    <>
      <ContainerScreen text="Repairs">
        <Text style={styles.text}>Escriba el VIM del Vehiculo</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          autoCorrect={false}
          autoFocus
          placeholder="Numero VIM"
          theme={{colors: {primary: '#00ACC1'}}}
          left={
            <TextInput.Icon
              icon={() => <Icon name="search-outline" size={20} color="#000" />}
            />
          }
          editable={true}
          value={vim}
          onChangeText={handleSearch}
        />
        {loading && (
          <ActivityIndicator
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.background,
              padding: 10,
            }}
          />
        )}
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
        {selectedGeneratorId ? (
          <Text style={styles.selectedText}>
            Generador Seleccionado: {selectedGeneratorId}
          </Text>
        ) : (
          <Text style={styles.selectedText}>
            No ha seleccionado un Generador
          </Text>
        )}
        <Button
          style={globalStyles.buttonSucces}
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
      </ContainerScreen>
    </>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
    color: '#00ACC1',
    marginBottom: 10,
    textAlign: 'center',
  },
});
