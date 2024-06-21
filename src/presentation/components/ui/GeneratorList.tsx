import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
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
  const [filteredGenerators, setFilteredGenerators] = useState<Generator[]>([]);
  const [searchText, setSearchText] = useState<string>('');
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
        setFilteredGenerators(generatorList);
      } catch (error) {
        console.error('Error fetching generators: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenerators();
  }, []);

  useEffect(() => {
    filterGenerators(searchText);
  }, [searchText, generators]);

  const filterGenerators = (text: string) => {
    const filtered = generators.filter(
      generator =>
        generator.nombre.toLowerCase().includes(text.toLowerCase()) ||
        generator.descripcion.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredGenerators(filtered);
  };

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
                <TextInput
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.searchInput}
                  placeholder="Buscar generador..."
                  placeholderTextColor="#c2c2c2"
                  value={searchText}
                  onChangeText={setSearchText}
                />
                {loading ? (
                  <Text>Loading...</Text>
                ) : (
                  <FlatList
                    data={filteredGenerators}
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
                    contentContainerStyle={styles.flatListContent}
                    ListFooterComponent={<View style={{height: 20}} />}
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
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#262626',
    textAlign: 'center',
  },
  searchInput: {
    color: '#000',
    width: '100%',
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  flatListContent: {
    flexGrow: 1,
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
    color: '#555555',
  },
  itemDescription: {
    fontSize: 14,
    color: 'gray',
  },
  buttonModal: {
    backgroundColor: 'purple',
  },
});
