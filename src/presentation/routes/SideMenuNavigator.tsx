import React from 'react';
import {Text, View, useWindowDimensions, Image, StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {globalColors} from '../../config/theme/theme';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, StackNavigator} from '../navigator/StackNavigator';
import {Button} from 'react-native-paper';

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
        name="HomeScreen"
        component={StackNavigator}
        options={{
          drawerLabel: () => null,
          drawerItemStyle: {
            display: 'none',
          },
        }}
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
        <Image
          source={require('../../assets/Imagotipo_Supremo_SinFondo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonNav
          nav="Home"
          label="News"
          icon={require('../../assets/Icon_News.png')}
        />
        <ButtonNav
          nav="Repairs"
          label="Repairs"
          icon={require('../../assets/Icono_Repairs.png')}
        />
        <ButtonNav
          nav="Generator"
          label="Generator"
          icon={require('../../assets/Icon_Generator.png')}
        />
      </View>
      <DrawerItemList {...props} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 MyApp</Text>
      </View>
    </DrawerContentScrollView>
  );
};

interface PropsButton {
  nav: string;
  label: string;
  icon: any;
}

export const ButtonNav = ({nav, label, icon}: PropsButton) => {
  const navigation = useNavigation<RootStackParamList>();
  return (
    <Button
      mode="contained"
      onPress={() => navigation.navigate(nav)}
      style={styles.button}
      labelStyle={styles.buttonLabel}>
      <View style={styles.buttonContent}>
        <Image source={icon} style={styles.buttonIcon} />
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </Button>
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
    width: 230,
    height: 220,
    borderRadius: 50,
    marginBottom: 10,
  },
  headerText: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 1,
    backgroundColor: globalColors.primary,
    padding: 2,
    borderRadius: 3,
  },
  buttonLabel: {
    color: '#FFF',
    fontSize: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 30,
    height: 30,
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

export default SideMenuNavigator;
