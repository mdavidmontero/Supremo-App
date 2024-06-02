import React from 'react';
import {View} from 'react-native';
import {HamburgerMenu} from '../../components/shared/HamburgerMenu';
import {globalStyles} from '../../../config/theme/theme';
import {Text} from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
export const HomeScreen = () => {
  // const [datos, setDatos] = React.useState<any>([]);

  // const loadData = async () => {
  //   try {
  //     const data = await firestore().collection('inventario').get();
  //     setDatos(data.docs[0].data());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadData();
  // }, []);

  // const renderItem = ({item}) => {
  //   return (
  //     <View
  //       style={{
  //         backgroundColor: 'white',
  //         padding: 10,
  //         margin: 5,
  //         borderRadius: 5,
  //         shadowColor: '#000',
  //         shadowOffset: {
  //           width: 0,
  //           height: 2,
  //         },
  //         shadowOpacity: 0.25,
  //         shadowRadius: 3.84,
  //         elevation: 5,
  //       }}>
  //       <Text>{item.data().nombre}</Text>
  //       <Text>{item.data().precio}</Text>
  //     </View>
  //   );
  // };

  return (
    <View style={globalStyles.container}>
      <HamburgerMenu />
      <Text>Hola</Text>
      {/* <Text>{datos.nombre}</Text>
      <Text>{datos.precio}</Text>
      <Text>{datos.modelo}</Text> */}
    </View>
  );
};
