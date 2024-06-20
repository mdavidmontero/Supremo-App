import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';

interface StepButtonProps {
  stepNumber: string;
  stepText: string;
  onPress: () => void;
  disabled: boolean;
}

const Circle = ({stepNumber}: {stepNumber: string}) => (
  <Avatar.Icon
    size={64}
    style={styles.circle}
    icon={() => <Text style={styles.stepText}>{stepNumber}</Text>}
  />
);

export const StepButton = ({
  stepNumber,
  stepText,
  onPress,
  disabled,
}: StepButtonProps) => {
  return (
    <View style={styles.contentBtn}>
      <Circle stepNumber={stepNumber} />
      <View>
        <Text style={styles.stepTitle}>{stepText}</Text>
        <Pressable
          style={[styles.btnStep, disabled && styles.disabled]}
          onPress={onPress}
          disabled={disabled}>
          <Text style={styles.btnStepText}>Test</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#00ACC1',
  },
  contentBtn: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  stepTitle: {
    textAlign: 'center',
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
  },
  btnStep: {
    backgroundColor: '#00ACC1',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
  },
  btnStepText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  disabled: {
    backgroundColor: '#A0A0A0',
  },
});
