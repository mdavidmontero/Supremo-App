import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../../config/theme/theme';
import {HamburgerMenu} from '../components/shared/HamburgerMenu';

export const Setting = () => {
  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text style={{color: 'black'}}>Setting</Text>
    </View>
  );
};
