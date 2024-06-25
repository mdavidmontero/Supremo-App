import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SideMenuNavigator} from './presentation/routes/SideMenuNavigator';
import SplashScreen from 'react-native-splash-screen';
import {SplashScreens} from './presentation/components/ui/splash/SplashScreen';

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      setShowSplash(false);
    }, 2000);
  }, []);
  if (showSplash) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer>
      <SideMenuNavigator />
    </NavigationContainer>
  );
};
