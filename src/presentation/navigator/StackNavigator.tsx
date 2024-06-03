import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {GeneratorScreen} from '../screens/generator/GeneratorScreen';
import {RepairsScreen} from '../screens/repairs/RepairsScreen';
import {ReportScreen} from '../screens/repairs/ReportScreen';
import {Vehicle} from '../../domain/entities/vehicle.entity';

export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Setting: undefined;
  Generator: undefined;
  Repairs: undefined;
  ReportScreen: {vehicle: Vehicle; generator: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Repairs" component={RepairsScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="Generator" component={GeneratorScreen} />
    </Stack.Navigator>
  );
};
