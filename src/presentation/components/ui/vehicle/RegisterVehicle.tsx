import React from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {globalStyles} from '../../../../config/theme/theme';
import {manualInput} from '../../../../types';

interface Props {
  handleModalSubmit: () => void;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  manualInput: manualInput;
  setManualInput: React.Dispatch<React.SetStateAction<manualInput>>;
}

export const ModalFormVehicle = ({
  handleModalSubmit,
  modalVisible,
  setModalVisible,
  manualInput,
  setManualInput,
}: Props) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Ingrese Datos del Vehículo</Text>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Cédula</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Cédula"
                  value={manualInput.cedula}
                  keyboardType="numeric"
                  placeholderTextColor={'#898787'}
                  onChangeText={text =>
                    setManualInput({...manualInput, cedula: text})
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre Completo</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Nombre Completo"
                  value={manualInput.nombreCompleto}
                  placeholderTextColor={'#898787'}
                  keyboardType="default"
                  onChangeText={text =>
                    setManualInput({...manualInput, nombreCompleto: text})
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Placa</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Placa"
                  placeholderTextColor={'#898787'}
                  autoCapitalize="characters"
                  value={manualInput.placa}
                  onChangeText={text =>
                    setManualInput({
                      ...manualInput,
                      placa: text.toUpperCase(),
                    })
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Modelo</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Modelo"
                  keyboardType="numeric"
                  placeholderTextColor={'#898787'}
                  value={manualInput.modelo}
                  onChangeText={text =>
                    setManualInput({
                      ...manualInput,
                      modelo: text,
                    })
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>VIN</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="VIN"
                  autoCapitalize="characters"
                  placeholderTextColor={'#898787'}
                  value={manualInput.vin}
                  onChangeText={text =>
                    setManualInput({...manualInput, vin: text.toUpperCase()})
                  }
                />
              </View>
            </ScrollView>
            <Button
              style={globalStyles.buttonSucces}
              mode="contained"
              onPress={handleModalSubmit}>
              Guardar
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => setModalVisible(false)}
              textColor="#898787"
              style={{marginTop: 10, backgroundColor: '#facece'}}>
              Cancelar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  modalContent: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  modalInput: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    color: '#000',
  },
});
