import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import firestore, {firebase} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ContainerScreen from '../../components/shared/ContainerScreen';
import RNFS from 'react-native-fs';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigator/StackNavigator';

interface DataJson {
  id: string;
  nombre: string;
  descripcion: string;
  image: string;
}

const UploadGenerator: React.FC = () => {
  const [jsonData, setJsonData] = useState<DataJson[] | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const navigation = useNavigation<RootStackParamList>();

  const selectJSONFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      let parsedData: DataJson[];

      if (Platform.OS === 'android' && res && res[0]?.uri) {
        const fileContent = await readContentUri(res[0].uri);
        parsedData = JSON.parse(fileContent);
      } else {
        const fileContent = await readFile(res[0].uri);
        parsedData = JSON.parse(fileContent);
      }

      if (!Array.isArray(parsedData)) {
        throw new Error(
          'El archivo JSON seleccionado no tiene el formato adecuado.',
        );
      }

      setJsonData(parsedData);
      setUploadSuccess(false);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Selección de archivo JSON cancelada');
      } else {
        console.error('Error al seleccionar archivo JSON:', error);
      }
    }
  };

  const selectImages = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      selectionLimit: 0,
    };

    launchImageLibrary(options as any, (response: any) => {
      if (response.didCancel) {
        console.log('Selección de imágenes cancelada');
      } else if (response.errorCode) {
        console.error('Error al seleccionar imágenes:', response.errorMessage);
      } else {
        const selectedImages: string[] = [
          ...images,
          ...response.assets.map((asset: Asset) => asset.uri),
        ];
        setImages(selectedImages);
        setUploadSuccess(false);
      }
    });
  };

  const uploadDataToFirestore = async () => {
    try {
      if (!jsonData) {
        console.error('Error: Debes seleccionar un archivo JSON primero.');
        return;
      }

      if (images.length === 0) {
        console.error('Error: Debes seleccionar al menos una imagen.');
        return;
      }

      const batch = firestore().batch();
      const uploadedImageUrls = await Promise.all(images.map(uploadImage));

      jsonData.forEach(async (data, index) => {
        const generatorRef = firestore().collection('generadores').doc();
        await batch.set(generatorRef, {
          descripcion: data.descripcion,
          id: data.id,
          nombre: data.nombre,
          imagen: uploadedImageUrls[index],
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

      await batch.commit();

      setUploadSuccess(true);
      setJsonData(null);
      setImages([]);

      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    } catch (error) {
      console.error('Error al subir datos a Firestore:', error);
    }
  };

  const readContentUri = async (uri: string): Promise<string> => {
    try {
      const contentUri = uri;
      const response = await readFile(contentUri);
      return response;
    } catch (error) {
      console.error('Error al leer contenido de URI:', error);
      throw error;
    }
  };

  const readFile = async (uri: string): Promise<string> => {
    try {
      const content = await RNFS.readFile(uri, 'utf8');
      return content;
    } catch (error) {
      console.error('Error al leer archivo:', error);
      throw error;
    }
  };

  const uploadImage = async (imageUri: string): Promise<string> => {
    try {
      const imageName = imageUri.split('/').pop() || 'image.jpg';
      const storageRef = storage().ref(`images/${imageName}`);
      await storageRef.putFile(imageUri);
      const imageUrl = await storageRef.getDownloadURL();
      return imageUrl;
    } catch (error) {
      console.error('Error al subir imagen a Firebase Storage:', error);
      throw error;
    }
  };

  return (
    <ContainerScreen text="Upload Data">
      <View style={styles.container}>
        <Text style={styles.textTitle}>
          Sistema de carga de archivos JSON y selección de imágenes
        </Text>
        <TouchableOpacity onPress={selectJSONFile} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Archivo JSON</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectImages} style={styles.button}>
          <Text style={styles.buttonText}>Seleccionar Imágenes</Text>
        </TouchableOpacity>
        {jsonData && (
          <Text style={styles.textSelected}>Datos JSON seleccionados</Text>
        )}

        {images.length > 0 && (
          <Text style={styles.textSelected}>
            {images.length} imágenes seleccionadas Correctamente
          </Text>
        )}

        {uploadSuccess && (
          <Text style={styles.uploadSuccess}>Datos Cargados Correctamente</Text>
        )}

        <TouchableOpacity
          style={[
            styles.button,
            !jsonData || images.length === 0
              ? styles.buttonDisabled
              : styles.buttonSuccess,
          ]}
          onPress={uploadDataToFirestore}
          disabled={!jsonData || images.length === 0}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Subir a Firebase
          </Text>
        </TouchableOpacity>
      </View>
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#00ACC1',
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonSuccess: {
    backgroundColor: '#00ACC1',
  },
  uploadSuccess: {
    color: '#00ACC1',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  textSelected: {
    color: '#00ACC1',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadGenerator;
