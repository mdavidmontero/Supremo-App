/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {HamburgerMenu} from '../../components/shared/HamburgerMenu';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export const RepairsScreen = () => {
  const [vim, setVim] = useState('');
  const handleSearch = (text: string) => {
    setVim(text);
    // Aquí puedes agregar tu lógica de búsqueda de API
    console.log('Buscar:', text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <HamburgerMenu />
        <Text style={styles.title}>Repais</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.text}>Escriba el VIM del Vehiculo</Text>
        <TextInput
          mode="outlined"
          style={styles.input}
          placeholder="Numero VIM"
          theme={{colors: {primary: '#00ACC1'}}}
          left={
            <TextInput.Icon
              icon={() => <Icon name="search-outline" size={20} color="#000" />}
            />
          }
          value={vim}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    bottom: 60,
  },
  topCircle: {
    width: width,
    height: height * 0.3,
    backgroundColor: '#00ACC1',
    borderBottomLeftRadius: width / 3,
    borderBottomRightRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#fff', // Ajusta según tu preferencia
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginTop: -height * 0.16,
    marginBottom: 50,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  text: {
    color: 'black',
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
  },
});
