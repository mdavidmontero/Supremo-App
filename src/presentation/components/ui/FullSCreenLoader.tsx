import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';

export const FullSCreenLoader = () => {
  const {colors} = useTheme();
  return (
    <View>
      <ActivityIndicator size={20} />
    </View>
  );
};
