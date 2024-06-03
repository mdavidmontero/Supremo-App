import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {
  text: string;
}

export const Title = ({text}: Props) => {
  return <Text style={styles.title}>{text}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    bottom: 70,
  },
});
