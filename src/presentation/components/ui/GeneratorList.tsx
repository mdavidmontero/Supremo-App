import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button, Provider, Portal} from 'react-native-paper';
import {globalStyles} from '../../../config/theme/theme';

interface Generator {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const GeneratorList = ({onSelect}: any) => {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchGenerators = async () => {
      try {
        const generatorList: Generator[] = [];
        const querySnapshot = await firestore().collection('generadores').get();
        querySnapshot.forEach(documentSnapshot => {
          generatorList.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          } as Generator);
        });
        setGenerators(generatorList);
      } catch (error) {
        console.error('Error fetching generators: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenerators();
  }, []);

  return (
    <>
      <Button
        style={globalStyles.buttonSucces}
        mode="contained"
        onPress={() => setModalVisible(true)}>
        Select Generator
      </Button>
      <Provider>
        <Portal>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select a Generator</Text>
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={generators}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => {
                          setModalVisible(false);
                          onSelect(item.id);
                        }}>
                        <Image
                          source={{uri: item.imagen}}
                          style={styles.image}
                        />
                        <View style={styles.itemTextContainer}>
                          <Text style={styles.itemTitle}>{item.nombre}</Text>
                          <Text style={styles.itemDescription}>
                            {item.descripcion}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  buttonModal: {
    backgroundColor: 'purple',
  },
});
