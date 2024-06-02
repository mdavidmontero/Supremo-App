/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const HamburgerMenu = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          style={{margin: 10}}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Icon name="menu-outline" size={30} color="#900" />
        </Pressable>
      ),
    });
  }, [navigation]);
  return <></>;
};
