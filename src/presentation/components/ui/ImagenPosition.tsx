import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';
interface Props {
  style?: StyleProp<ImageStyle>;
}
export const ImagenPosition = ({style}: Props) => {
  const fontImg = require('../../../assets/Figure_Abajo.png');
  return (
    <Image
      source={fontImg}
      style={[
        {
          width: 300,
          height: 300,
        },
        style,
      ]}
    />
  );
};
