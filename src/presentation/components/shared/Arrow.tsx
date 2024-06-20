import React from 'react';
import Svg, {Polyline} from 'react-native-svg';

export const Arrow = () => (
  <Svg width="200" height="100" viewBox="0 0 200 100">
    <Polyline
      points="10,10 10,50 190,50 190,90"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />
    <Polyline
      points="180,85 190,90 200,85"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />
  </Svg>
);

export const Arrow2 = () => (
  <Svg width="200" height="100" viewBox="0 0 200 100">
    <Polyline
      points="190,10 190,50 10,50 10,90"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />
    <Polyline
      points="20,85 10,90 0,85"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />
  </Svg>
);
