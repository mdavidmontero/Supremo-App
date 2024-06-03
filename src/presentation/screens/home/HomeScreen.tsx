/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import {Report} from '../../../domain/entities/report.entity';
import {loadMoreReports, loadReports} from '../../../actions/get-reports';

const {width, height} = Dimensions.get('window');

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [fetchingMore, setFetchingMore] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const initialReports = await loadReports();
      setReports(initialReports);
      setLastDoc(initialReports[initialReports.length - 1]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const loadMoreData = async () => {
    if (fetchingMore || !lastDoc) {
      return;
    }

    setFetchingMore(true);
    try {
      const moreReports = await loadMoreReports(lastDoc);
      setReports(prevReports => [...prevReports, ...moreReports]);
      setLastDoc(moreReports[moreReports.length - 1]);
    } catch (error) {
      console.error(error);
    }
    setFetchingMore(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({item}: {item: Report}) => (
    <View style={styles.card}>
      {item.createdAt && (
        <Text style={{color: 'grey', fontSize: 15}}>
          {item.createdAt.toLocaleDateString()}{' '}
          {item.createdAt.toLocaleTimeString()}
        </Text>
      )}
      <View style={styles.row}>
        <Text style={styles.label}>Vim: </Text>
        <Text style={styles.cardTitle}>{item.vin}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Observations: </Text>
        <Text style={styles.value}>{item.observations}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status: </Text>
        <Text style={styles.value}>{item.status}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Generator Id: </Text>
        <Text style={styles.value}>{item.generatorId}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <ImagenPosition style={styles.imgPosition} />
        <Pressable
          style={styles.menuIconContainer}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Icon name="menu-outline" size={30} color="#fff" />
        </Pressable>
        <View style={styles.topCircle}>
          <Title text="News" />
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: 'bold',
              bottom: 20,
              right: 120,
            }}>
            Latest reports
          </Text>
        </View>
        <View style={{flex: 1, bottom: 120}}>
          {loading ? (
            <ActivityIndicator size="large" color="#00ACC1" />
          ) : (
            <FlatList
              horizontal
              data={reports}
              renderItem={renderItem}
              keyExtractor={item => item.ids}
              contentContainerStyle={styles.contentContainer}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                fetchingMore ? (
                  <ActivityIndicator size="small" color="#00ACC1" />
                ) : null
              }
            />
          )}
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
  titleNews: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ACC1',
    marginHorizontal: 10,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#555',
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
    flexGrow: 1,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.7,
    height: height * 0.29,
    overflow: 'scroll',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#00ACC1',
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

export default HomeScreen;
