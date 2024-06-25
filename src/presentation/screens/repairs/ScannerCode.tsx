import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import {decodedScanner} from '../../../types';

interface Props {
  onDataScanned: (data: decodedScanner) => void;
  setShowScanner: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CodeScanner = ({onDataScanned, setShowScanner}: Props) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [decodedData, setDecodedData] = useState<decodedScanner>({
    cedula: '',
    nombreCompleto: '',
    placa: '',
    vin: '',
    modelo: '',
  });
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    requestPermission().then(status => {
      if (!status) {
        console.log('Permission denied');
      }
    });
  }, [requestPermission]);

  const parseData = (data: any) => {
    const parsedData = {...decodedData};

    console.log('Raw data:', data);

    const cedulaMatch = data.match(/C\d{1,10}/);
    if (cedulaMatch) {
      parsedData.cedula = cedulaMatch[0].replace(/^C/, '');
    }
    console.log('Cedula:', parsedData.cedula);

    const nameMatch = data.match(/\b[A-Z]+\b(?:\s+[A-Z]+\b){0,2}/);
    if (nameMatch) {
      const formattedName = nameMatch[0].replace(/\s+/g, ' ');
      parsedData.nombreCompleto = formattedName.trim();
    }
    console.log('Nombre Completo:', parsedData.nombreCompleto);

    const plateMatch = data.match(/[A-Z]{3}\d{3}/);
    if (plateMatch) {
      parsedData.placa = plateMatch[0];

      const vinStartIndex =
        data.indexOf(parsedData.placa) + parsedData.placa.length;
      const vin = data.substring(vinStartIndex, vinStartIndex + 17);
      parsedData.vin = vin;

      console.log('Placa:', parsedData.placa);
      console.log('VIN:', parsedData.vin);

      const vinSecondIndex = data.indexOf(parsedData.vin, vinStartIndex + 17);
      if (vinSecondIndex !== -1) {
        const modelIndex = vinSecondIndex + parsedData.vin.length + 7;
        const modelMatch = data
          .substring(modelIndex, modelIndex + 4)
          .match(/\b(19[5-9]\d|20[0-2]\d|2030)\b/);
        if (modelMatch) {
          parsedData.modelo = modelMatch[0];
        }
        console.log('Modelo:', parsedData.modelo);
      }
    }

    return parsedData;
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['pdf-417'],
    onCodeScanned: async codes => {
      console.log(`Scanned ${codes.length} codes!`);
      codes.forEach(async code => {
        console.log(`${code.type}: ${code.value}`);
        const parsedData = parseData(code.value);
        setDecodedData(parsedData);
        onDataScanned(parsedData);
      });
    },
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      return await cameraRef.current.takePhoto();
    }
    return null;
  };

  const handleTakePicture = async () => {
    const photo = await takePicture();
    if (photo) {
      console.log('Captured photo:', photo);
    } else {
      console.log('Error capturing photo: cameraRef.current is null');
    }
  };

  if (!hasPermission) {
    return <Text style={{color: 'black'}}>No hay permiso para la cámara</Text>;
  }
  if (device == null) {
    return (
      <Text style={{color: 'black'}}>
        No hay dispositivos de cámara disponibles
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        onInitialized={() => setCameraReady(true)}
        photo={true}
        videoStabilizationMode="auto"
        lowLightBoost={true}
      />
      {!cameraReady && (
        <Text style={styles.loadingText}>Cargando cámara...</Text>
      )}
      {/* <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Cédula: {decodedData.cedula}</Text>
        <Text style={styles.dataText}>
          Nombre Completo: {decodedData.nombreCompleto}
        </Text>
        <Text style={styles.dataText}>Placa: {decodedData.placa}</Text>
        <Text style={styles.dataText}>VIN: {decodedData.vin}</Text>
        <Text style={styles.dataText}>Modelo: {decodedData.modelo}</Text>
      </View> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleTakePicture}
          disabled={!cameraReady}>
          <Text>Capturar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeCamera}
          onPress={() => setShowScanner(false)}>
          <Text>Cerrar Cámara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  loadingText: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    fontSize: 18,
    color: 'white',
  },
  dataContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  captureButton: {
    backgroundColor: '#00ACC1',
    padding: 10,
    borderRadius: 5,
  },
  captureButtonText: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
  },
  closeCamera: {
    backgroundColor: '#e21c45',
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
