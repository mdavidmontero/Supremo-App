import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';

const {width, height} = Dimensions.get('window');

interface StepScreenParams {
  step: number;
  onStepComplete: (data: string) => void;
}

const StepInputScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {step, onStepComplete} = route.params as StepScreenParams;
  const [code, setCode] = useState('');

  const handleRegister = () => {
    onStepComplete(code);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo} />
      <ImagenPosition style={styles.imgPosition} />
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.goBack()}>
        <Text style={styles.menuIcon}>Back</Text>
      </Pressable>
      <View style={styles.topCircle}>
        <Title text={`Step ${step}`} />
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Code for Step {step}</Text>
        <TextInput
          style={styles.input}
          value={code}
          keyboardType="numeric"
          onChangeText={setCode}
          placeholder="Enter code"
        />
        <Pressable style={styles.btnRegister} onPress={handleRegister}>
          <Text style={styles.btnRegisterText}>Register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ACE3E9'},
  menuIconContainer: {position: 'absolute', top: 15, left: 13, zIndex: 1},
  menuIcon: {color: '#fff', fontSize: 18},
  topCircle: {
    width: width,
    height: height * 0.3,
    backgroundColor: '#00ACC1',
    borderBottomLeftRadius: width / 3,
    borderBottomRightRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#B2EBF2',
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 30,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#00ACC1',
    borderStyle: 'solid',
    top: -120,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 20,
    color: 'black',
    alignItems: 'center',
    borderStyle: 'solid',
    textAlign: 'center',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#00ACC1',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  btnRegister: {
    backgroundColor: '#00ACC1',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 60,
    alignItems: 'center',
  },
  btnRegisterText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  imgPosition: {
    position: 'absolute',
    bottom: -30,
    left: -20,
  },
  logo: {
    position: 'absolute',
    top: -10,
    right: -5,
    zIndex: 3,
  },
});

export default StepInputScreen;
