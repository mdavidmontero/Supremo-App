import {StyleSheet} from 'react-native';

export const globalColors = {
  primary: '#00838F',
  secondary: '#f72585',
  tertiary: '#3a0ca3',
  success: '#4cc9f0',
  warning: '#fca311',
  danger: '#e71d36',
  dark: '#2222eb',
  background: '#fff',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.background,
  },

  primaryButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.background,
    fontSize: 18,
  },
  menuIconContainer: {
    position: 'absolute', // Ajusta el contenedor en la esquina izquierda
    top: 15,
    left: 13,
    zIndex: 1, // Ajusta el orden de renderizado
  },
});
