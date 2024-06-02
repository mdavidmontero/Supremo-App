import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../../config/theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerActions, useNavigation} from '@react-navigation/native';
// import {seedDatabase} from '../../../data/seeder';

export const GeneratorScreen = () => {
  // const [hasSeeded, setHasSeeded] = useState(false);
  const navigation = useNavigation();
  // useEffect(() => {
  //   if (!hasSeeded) {
  //     seedDatabase().then(() => setHasSeeded(true));
  //   }
  // }, [hasSeeded]);

  return (
    <View style={globalStyles.container}>
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
        <Icon name="menu-outline" size={30} color="#900" />
      </Pressable>
      <Text>GeneratorScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuIconContainer: {
    position: 'absolute',
    top: 15,
    left: 13,
    zIndex: 1,
  },
});
