import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../../config/theme/theme';
import {HamburgerMenu} from '../components/shared/HamburgerMenu';
import firestore from '@react-native-firebase/firestore';

export const Setting = () => {
  const loadData = async () => {
    try {
      const data = await firestore().collection('inventario').get();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text style={{color: 'black'}}>Setting</Text>
    </View>
  );
};
