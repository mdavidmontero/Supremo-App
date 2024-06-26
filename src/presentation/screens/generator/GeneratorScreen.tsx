import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
  Button,
} from 'react-native';
import {ContainerScreen} from '../../components/shared/ContainerScreen';
import {FadeInImage} from '../../components/ui/FadeInImage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Generator} from '../../../infrastructure/interfaces/generator-db.response';
type RootStackParamList = {
  GeneratorDetail: {generator: Generator};
  UploadData: undefined;
};

export const GeneratorScreen: React.FC = () => {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [filteredGenerators, setFilteredGenerators] = useState<Generator[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const handleGeneratorPress = (generator: Generator) => {
    navigation.navigate('GeneratorDetail', {generator});
  };

  return (
    <View style={styles.container}>
      <ContainerScreen text="Generators">
        <TouchableOpacity
          style={styles.btnUpload}
          onPress={() => navigation.navigate('UploadData')}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontWeight: 'semibold',
            }}>
            Cargar Generadores
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar generador..."
          placeholderTextColor="#c2c2c2"
          value={searchText}
          onChangeText={setSearchText}
        />
        {generators.length ? (
          <View style={styles.columnContainer}>
            {filteredGenerators.map(generator => (
              <TouchableOpacity
                key={generator.id}
                style={styles.card}
                onPress={() => handleGeneratorPress(generator)}>
                <FadeInImage uri={generator.imagen} style={styles.image} />
                <Text style={styles.title}>{generator.nombre}</Text>
                <Text style={styles.description}>{generator.descripcion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text
            style={{
              color: '#00ACC1',
              margin: 10,
              textAlign: 'center',
              fontWeight: 'semibold',
              fontSize: 18,
            }}>
            No hay Generadores
          </Text>
        )}
      </ContainerScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    color: '#000',
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    width: '45%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnUpload: {
    backgroundColor: '#00ACC1',
    color: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default GeneratorScreen;
