import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {GeneratorScreen} from '../screens/generator/GeneratorScreen';
import {RepairsScreen} from '../screens/repairs/RepairsScreen';
import {ReportScreen} from '../screens/repairs/ReportScreen';
import {Vehicle} from '../../domain/entities/vehicle.entity';
import {TestVehicleScreen} from '../screens/repairs/TestVehicleScreen';
import StepInputScreen from '../screens/repairs/StepInputScreen';
import GeneratorDetailScreen from '../components/ui/GeneratorDetails';

export type RootStackParamList = {
  navigate: any;
  Home: undefined;
  Setting: undefined;
  Generator: undefined;
  Repairs: undefined;
  ReportScreen: {vehicle: Vehicle; generator: string};
  Test: {
    vehicles: Vehicle;
    generator: string;
    observations: string;
    previousObservations: any[];
  };
  StepInput: any;
  GeneratorDetail: {
    generator: Generator;
  };
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
      <Stack.Screen name="Test" component={TestVehicleScreen} />
      <Stack.Screen name="StepInput" component={StepInputScreen} />
      <Stack.Screen name="GeneratorDetail" component={GeneratorDetailScreen} />
    </Stack.Navigator>
  );
};
