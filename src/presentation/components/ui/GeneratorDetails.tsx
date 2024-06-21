import React, {useState} from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import ContainerScreen from '../shared/ContainerScreen';
import {Modal, Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const GeneratorDetailScreen = ({route}) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const {generator} = route.params;

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <ContainerScreen text="Detalles">
      <View style={styles.container}>
        <Text style={styles.title}>{generator.nombre}</Text>
        <Text style={styles.description}>{generator.descripcion}</Text>
        <Text style={styles.label}>Imagen del Generador:</Text>
        <Pressable onPress={showModal}>
          <Image style={styles.image} source={{uri: generator.imagen}} />
        </Pressable>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <Image style={styles.modalImage} source={{uri: generator.imagen}} />
          <Button
            mode="contained"
            onPress={hideModal}
            style={styles.closeButton}>
            Cerrar
          </Button>
        </Modal>
      </View>
    </ContainerScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#333',
    fontFamily: 'Arial',
    letterSpacing: 2,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    width: '100%',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Arial',
    letterSpacing: 1,
    marginTop: 10,
    width: '100%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
    fontFamily: 'Arial',
    letterSpacing: 1.5,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  modalImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
  },
});

export default GeneratorDetailScreen;
