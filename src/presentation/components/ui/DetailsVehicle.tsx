import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

export const DetailsVehicle = ({model, year, plate, color, vim, isVisible}) => {
  if (!isVisible) {
    return null;
  }
  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Detalles del Vehículo</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Modelo:</Text>
            <Text style={styles.value}>{model}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Año:</Text>
            <Text style={styles.value}>{year}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Placa:</Text>
            <Text style={styles.value}>{plate}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Color:</Text>
            <Text style={styles.value}>{color}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>VIM:</Text>
            <Text style={styles.value}>{vim}</Text>
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
    backgroundColor: '#ffffff',
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
    fontSize: 22,
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
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
});
