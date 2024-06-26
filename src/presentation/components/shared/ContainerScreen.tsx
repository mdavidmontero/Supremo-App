import {DrawerActions, useNavigation, useRoute} from '@react-navigation/native';
import React, {FC} from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Title} from './Title';
import {ImagenPosition} from '../ui/ImagenPosition';
import {Logo} from './Logo';

const {width, height} = Dimensions.get('window');

export type ContainerScreenProps = {
  children: React.ReactNode;
  text: string;
};

export const ContainerScreen: FC<ContainerScreenProps> = ({children, text}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <ImagenPosition style={styles.imgPosition} />

        {route.name === 'GeneratorDetail' || 'DetailReportScreen' ? (
          <Pressable
            style={styles.menuIconContainer}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
          </Pressable>
        ) : (
          <Pressable style={styles.menuIconContainer} onPress={toggleDrawer}>
            <Icon name="menu-outline" size={30} color="#fff" />
          </Pressable>
        )}

        <View style={styles.topCircle}>
          <Title text={text} />
        </View>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.containerForm}>{children}</View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  container: {
    flex: 1,
  },
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
  menuIconContainer: {
    position: 'absolute',
    top: 15,
    left: 13,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: -height * 0.15,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 20,
    marginBottom: 50,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
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
  customPressable: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  customPressableText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  anotherPressable: {
    backgroundColor: 'green',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  anotherPressableText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ContainerScreen;
