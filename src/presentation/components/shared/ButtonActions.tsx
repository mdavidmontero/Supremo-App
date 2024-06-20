import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface Props {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
}

export const ButtonActions = ({text, onPress}: Props) => {
  return (
    <View style={styles.containerButton}>
      <Pressable style={styles.btnActions} onPress={onPress}>
        <Text style={styles.btnText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
  btnActions: {
    backgroundColor: '#007988',
    padding: 16,
    borderRadius: 30,
    paddingHorizontal: 50,
  },
  btnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
