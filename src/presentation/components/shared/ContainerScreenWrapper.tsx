import React from 'react';
import ContainerScreen from './ContainerScreen';
import {View} from 'react-native';

const ContainerScreenWrapper: React.FC = () => {
  return (
    <ContainerScreen text="Container Home ">
      <View>{}</View>
    </ContainerScreen>
  );
};

export default ContainerScreenWrapper;
