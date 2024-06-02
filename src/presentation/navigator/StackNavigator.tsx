import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {GeneratorScreen} from '../screens/generator/GeneratorScreen';
import {RepairsScreen} from '../screens/repairs/RepairsScreen';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {Setting} from '../screens/Settings';

export type RootStackParamList = {
  Home: undefined;
  Setting: undefined;
  Generator: undefined;
  Repairs: undefined;
};

const Stack = createStackNavigator();

export const StackNavigator = () => {
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      headerShown: false,
    });
  }, [navigator]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Generator" component={GeneratorScreen} />
      <Stack.Screen name="Repairs" component={RepairsScreen} />
      <Stack.Screen name="Setting" component={Setting} />
    </Stack.Navigator>
  );
};
