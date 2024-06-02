import React from 'react';
import {View} from 'react-native';
import {type NavigationProp, useNavigation} from '@react-navigation/native';
import {HamburgerMenu} from '../../components/shared/HamburgerMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '../../../config/theme/theme';
import {RootStackParamList} from '../../navigator/StackNavigator';
import {PrimaryButton} from '../../components/shared/PrimaryButton';
import {Text} from 'react-native-paper';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text>Hola</Text>
    </View>
  );
};
