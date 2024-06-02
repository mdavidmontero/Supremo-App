import React from 'react';
import {Text, View} from 'react-native';
import {HamburgerMenu} from '../../components/shared/HamburgerMenu';
import {globalStyles} from '../../../config/theme/theme';

export const GeneratorScreen = () => {
  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text>GeneratorScreen</Text>
    </View>
  );
};
