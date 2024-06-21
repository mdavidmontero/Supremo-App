import React, {FC} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';

interface Observation {
  createdAt: any;
  text: string;
}

interface PreviousObservation {
  id: string;
  observations: Observation[];
}

interface Props {
  observations: PreviousObservation[];
}

const PreviousObservationsList: FC<Props> = ({observations}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Last observation</Text>
      <ScrollView style={styles.scrollContainer}>
        {observations.length > 0 ? (
          observations.map((obs, index) => (
            <View key={obs.id}>
              <View style={styles.observationContainer}>
                <View style={styles.observation}>
                  <Text style={styles.observationText}>
                    {obs.observations[obs.observations.length - 1].text}
                  </Text>
                  <Text style={styles.observationDate}>
                    {obs.observations[obs.observations.length - 1].createdAt
                      .toDate()
                      .toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noObservationsText}>
            No previous observations.
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  scrollContainer: {
    maxHeight: 200,
  },
  observationContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  observation: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  observationText: {
    color: 'black',
  },
  observationDate: {
    color: '#555',
    fontSize: 12,
  },
  noObservationsText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
  },
});

export default PreviousObservationsList;
