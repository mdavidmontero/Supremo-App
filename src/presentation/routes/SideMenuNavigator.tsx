/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text, View, useWindowDimensions, Image, StyleSheet} from 'react-native';
import {globalColors} from '../../config/theme/theme';
import {IonIcon} from '../components/shared/IonIcon';
import {RepairsScreen} from '../screens/repairs/RepairsScreen';
import {GeneratorScreen} from '../screens/generator/GeneratorScreen';
import {StackNavigator} from '../navigator/StackNavigator';

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () => {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? 'permanent' : 'slide',
        headerShown: false,
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: 'white',
        drawerInactiveBackgroundColor: 'white',
        drawerInactiveTintColor: globalColors.primary,
        drawerItemStyle: {
          marginVertical: 5,
          borderColor: 'black',
        },
        drawerStyle: {
          backgroundColor: globalColors.background,
        },
      }}>
      <Drawer.Screen
        name="News"
        component={StackNavigator}
        options={{
          drawerIcon: ({color}) => (
            <IonIcon name="home-outline" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <IonIcon name="ribbon-outline" color={color} />
          ),
        }}
        name="Repairs"
        component={RepairsScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <IonIcon name="shield-checkmark-outline" color={color} />
          ),
        }}
        name="Generator"
        component={GeneratorScreen}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}>
      <View style={styles.header}>
        {/* <Image source={require('../../assets/logo.png')} style={styles.logo} /> */}
        <Text style={styles.headerText}>Bienvenido</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 MyApp</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    height: 200,
    backgroundColor: globalColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#212121',
    fontSize: 12,
  },
});
