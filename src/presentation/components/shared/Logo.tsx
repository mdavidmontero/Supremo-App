import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

interface Props {
  style?: StyleProp<ImageStyle>;
}
export const Logo = ({style}: Props) => {
  const fontImg = require('../../../assets/Isotipo_Supremo_SinFondo.png');
  return (
    <Image
      source={fontImg}
      style={[
        {
          width: 100,
          height: 100,
          zIndex: 0,
        },
        style,
      ]}
    />
  );
};
