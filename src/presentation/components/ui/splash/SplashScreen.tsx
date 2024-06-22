import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImagenPosition, ImagenPositionTop} from '../ImagenPosition';

export const SplashScreens = () => {
  return (
    <SafeAreaView style={styles.containerPlash}>
      <ImagenPosition style={styles.imgPosition} />
      <Image
        style={styles.logoImage}
        source={require('../../../../assets/Imagotipo_Supremo_SinFondo.png')}
      />
      <ImagenPositionTop style={styles.imgPositionTop} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerPlash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logoImage: {
    width: 300,
    height: 300,
    borderRadius: 100,
  },
  imgPosition: {
    position: 'absolute',
    bottom: -30,
    left: -20,
  },
  imgPositionTop: {
    position: 'absolute',
    top: -30,
    right: -20,
  },
});
