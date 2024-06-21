import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ContainerScreen} from '../../components/shared/ContainerScreen';
import {FadeInImage} from '../../components/ui/FadeInImage';
// import {seedDatabase} from '../../../data/seeder';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

interface Generator {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
}

export const GeneratorScreen = () => {
  const [generators, setGenerators] = useState<Generator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

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
  const handleGeneratorPress = (generator: Generator) => {
    navigation.navigate('GeneratorDetail', {generator});
  };
  return (
    <View style={styles.container}>
      <ContainerScreen text="Generators">
        <View style={styles.columnContainer}>
          {generators.map(generator => (
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
      </ContainerScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
