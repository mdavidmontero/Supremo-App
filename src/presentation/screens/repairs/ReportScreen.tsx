// ReportScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export const ReportScreen = ({route, navigation}) => {
  const {vehicle, generator} = route.params;
  const [observations, setObservations] = useState('');
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = React.useState<any>([]);

  console.log(generator);
  const loadData = async () => {
    try {
      const generatorDoc = await firestore()
        .collection('generadores')
        .doc(generator)
        .get();
      if (generatorDoc.exists) {
        setDatos(generatorDoc.data());
        console.log(generatorDoc.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await firestore().collection('reports').add({
        vin: vehicle.vin,
        vehicleId: vehicle.id,
        generatorId: generator,
        observations,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Error saving report: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vehicle Report</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Vehicle VIN: {vehicle.vin}</Text>
        <Text style={styles.label}>Vehicle Model: {vehicle.model}</Text>
        <Text style={styles.label}>Vehicle Plate: {vehicle.licensePlate}</Text>
        <Text style={styles.label}>Generator Name: {datos.nombre}</Text>
        <Text style={styles.label}>
          Generator Description: {datos.descripcion}
        </Text>
        <View style={styles.imagenContainer}>
          <Image style={styles.image} source={{uri: datos.imagen}} />
        </View>
      </View>
      <TextInput
        mode="outlined"
        label="Observations"
        multiline
        numberOfLines={5}
        value={observations}
        onChangeText={setObservations}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} loading={loading}>
        Save Report
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    alignItems: 'center',
  },
  detailContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
  },
  input: {
    marginBottom: 20,
  },
  imagenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
