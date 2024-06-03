import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ContainerScreen} from '../../components/shared/ContainerScreen';
// import {seedDatabase} from '../../../data/seeder';

export const GeneratorScreen = () => {
  // const [hasSeeded, setHasSeeded] = useState(false);
  // useEffect(() => {
  //   if (!hasSeeded) {
  //     seedDatabase().then(() => setHasSeeded(true));
  //   }
  // }, [hasSeeded]);

  return (
    <View style={styles.container}>
      <ContainerScreen text="Generators">
        <Text style={{color: 'black'}}>Generators</Text>
      </ContainerScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
