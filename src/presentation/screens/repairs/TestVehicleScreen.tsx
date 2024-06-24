import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';
import {Arrow, Arrow2} from '../../components/shared/Arrow';
import {StepButton} from '../../components/shared/StepButton';
import {Button} from 'react-native-paper';
import {globalStyles} from '../../../config/theme/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigator/StackNavigator';
import firestore from '@react-native-firebase/firestore';
import {StepData} from '../../../infrastructure/interfaces/reports-db.responses';
import {mapToReport} from '../../../infrastructure/mappers/reports-vehicle.mapper';
import {Report} from '../../../domain/entities/reports.entity';
import {saveVehicle} from '../../../actions/save-vehicle';
import {Vehicle} from '../../../types';

interface Props extends StackScreenProps<RootStackParamList, 'Test'> {}
type TestScreenRouteProp = RouteProp<RootStackParamList, 'Test'>;

const {width, height} = Dimensions.get('window');
export const TestVehicleScreen = ({navigation}: Props) => {
  const route = useRoute<TestScreenRouteProp>();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stepData, setStepData] = useState<StepData>({
    step1: '',
    step2: '',
    step3: '',
  });
  const {vehicles, generator, observations, previousObservations, status} =
    route.params;

  const handlePress = (step: number) => {
    navigation.navigate('StepInput', {
      step,
      onStepComplete: (data: string) => {
        setStepData(prevData => ({...prevData, [`step${step}`]: data}));
        if (step < 3) {
          setCurrentStep(step + 1);
        }
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSave}>
          <Text style={{marginRight: 10}}>Save</Text>
        </Pressable>
      ),
    });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const reportData = mapToReport(
        vehicles,
        generator,
        observations,
        stepData,
      );
      const existingReport = previousObservations.find(
        report => report.status === 'pending',
      );
      if (existingReport) {
        await updateReport(existingReport.id, reportData);
      } else {
        await createNewReport(reportData, vehicles);
      }
    } catch (error) {
      throw new Error('Error saving report');
    } finally {
      setLoading(false);
    }
  };

  const updateReport = async (reportId: string, reportData: Report) => {
    try {
      await firestore()
        .collection('reports')
        .doc(reportId)
        .update({
          observations: firestore.FieldValue.arrayUnion({
            text: observations,
            createdAt: new Date(),
          }),
          step1: stepData.step1,
          step2: stepData.step2,
          step3: stepData.step3,
          status: status,
        });
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating report: ', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewReport = async (report: Report, vehicle: Vehicle) => {
    try {
      const vin = await saveVehicle(vehicle);

      const reportData = {
        ...report,
        vin,
        createdAt: new Date(),
      };

      const docRef = await firestore().collection('reports').add(reportData);
      navigation.navigate('Home');
      return docRef.id;
    } catch (error) {
      console.error('Error saving report: ', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo} />
      <ImagenPosition style={styles.imgPosition} />
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-circle-outline" size={30} color="#fff" />
      </Pressable>
      <View style={styles.topCircle}>
        <Title text="Test Vehicle" />
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>Tests</Text>
          <StepButton
            stepNumber="1"
            stepText="First Step"
            onPress={() => handlePress(1)}
            disabled={currentStep !== 1}
          />
          <View style={styles.stepsArrow}>
            <Arrow />
          </View>
          <StepButton
            stepNumber="2"
            stepText="Second Step"
            onPress={() => handlePress(2)}
            disabled={currentStep !== 2}
          />
          <View style={styles.stepsArrow2}>
            <Arrow2 />
          </View>
          <StepButton
            stepNumber="3"
            stepText="Third Step"
            onPress={() => handlePress(3)}
            disabled={currentStep !== 3}
          />
          <View style={styles.btnseparated}>
            <Button
              mode="contained"
              style={globalStyles.buttonSucces}
              onPress={handleSave}
              loading={loading}>
              Save Report
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ACE3E9',
  },
  menuIconContainer: {
    position: 'absolute',
    top: 15,
    left: 13,
    zIndex: 1,
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
  contentContainer: {
    marginTop: -height * 0.15,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#B2EBF2',
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#00ACC1',
    borderStyle: 'solid',
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
  stepsArrow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -18,
  },
  stepsArrow2: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -9,
  },
  btnseparated: {
    marginTop: 15,
  },
});

export default TestVehicleScreen;
