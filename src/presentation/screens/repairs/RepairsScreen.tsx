import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ActivityIndicator, Button, useTheme} from 'react-native-paper';
import {DetailsVehicle} from '../../components/ui/DetailsVehicle';
import {useNavigation} from '@react-navigation/native';
import {GeneratorList} from '../../components/ui/GeneratorList';
import {globalStyles} from '../../../config/theme/theme';
import {RootStackParamList} from '../../navigator/StackNavigator';
import ContainerScreen from '../../components/shared/ContainerScreen';
import {CodeScanner} from './ScannerCode';
import {ModalFormVehicle} from '../../components/ui/vehicle/RegisterVehicle';
import {decodedScanner} from '../../../types';

export const RepairsScreen = () => {
  const [selectedGeneratorId, setSelectedGeneratorId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState<decodedScanner>({
    cedula: '',
    nombreCompleto: '',
    placa: '',
    vin: '',
    modelo: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<RootStackParamList>();
  const {colors} = useTheme();
  const [showScanner, setShowScanner] = useState(false);

  const handleProceed = () => {
    if (scannedData && selectedGeneratorId) {
      navigation.navigate('ReportScreen', {
        vehicle: scannedData,
        generator: selectedGeneratorId,
      }) as any;
    }
  };
  console.log(scannedData);

  const handleDataScanned = (scannedData: decodedScanner) => {
    setScannedData(scannedData);
    setShowScanner(false);
  };

  const handleModalSubmit = () => {
    setModalVisible(false);
  };

  return (
    <>
      <ContainerScreen text="Repairs">
        <Text style={styles.text}>Datos del Vehiculo</Text>

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

        {scannedData.cedula && (
          <DetailsVehicle
            cedula={scannedData?.cedula}
            nombre={scannedData?.nombreCompleto}
            plate={scannedData?.placa}
            modelo={scannedData?.modelo}
            vin={scannedData?.vin}
            isVisible={!!scannedData && !loading}
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
          disabled={!scannedData.cedula || !selectedGeneratorId}>
          Proceed to Report
        </Button>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setShowScanner(true)}>
          <Text style={styles.scanButtonText}>Abrir Escaner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.scanButtonText}>Ingresar Manualmente</Text>
        </TouchableOpacity>
        <ModalFormVehicle
          handleModalSubmit={handleModalSubmit}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          manualInput={scannedData}
          setManualInput={setScannedData}
        />

        {showScanner && (
          <View style={StyleSheet.absoluteFill}>
            <CodeScanner
              onDataScanned={handleDataScanned}
              setShowScanner={setShowScanner}
            />
          </View>
        )}
      </ContainerScreen>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
  selectedText: {
    fontSize: 18,
    color: '#00ACC1',
    marginBottom: 10,
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#00ACC1',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
