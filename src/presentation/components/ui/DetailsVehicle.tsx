import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

interface Props {
  cedula: string;
  nombre: string;
  plate: string;
  vin: string;
  isVisible: boolean;
}

export const DetailsVehicle = ({
  cedula,
  nombre,
  plate,
  vin,
  isVisible,
}: Props) => {
  if (!isVisible) {
    return null;
  }
  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Detalles del Vehículo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Cedula:</Text>
            <Text style={styles.value}>{cedula}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{nombre}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Placa:</Text>
            <Text style={styles.value}>{plate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>VIN:</Text>
            <Text style={styles.value}>{vin}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  card: {
    width: '100%',
    backgroundColor: '#B2EBF2',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});
