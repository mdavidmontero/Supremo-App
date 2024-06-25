import React, {useEffect, useState} from 'react';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {
  SafeAreaView,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import {Logo} from '../../components/shared/Logo';
import {ImagenPosition} from '../../components/ui/ImagenPosition';
import {Title} from '../../components/shared/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import {loadMoreReports, loadReports} from '../../../actions/get-reports';
import {Report} from '../../../domain/entities/report.entity';

const {width, height} = Dimensions.get('window');

type RootStackParamList = {
  DetailReportScreen: {report: Report};
};

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const refreshData = async () => {
    setRefreshing(true);
    try {
      const refreshedReports = await loadReports();
      setReports(refreshedReports);
      setLastDoc(refreshedReports[refreshedReports.length - 1]);
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
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

  const navigateToDetail = (item: Report) => {
    navigation.navigate('DetailReportScreen', {report: item});
  };

  const renderItem = ({item}: {item: any}) => (
    <Pressable onPress={() => navigateToDetail(item)}>
      <View style={styles.card}>
        {item.createdAt && (
          <Text
            style={{
              color: 'grey',
              fontSize: 15,
              marginHorizontal: 10,
              marginTop: 10,
            }}>
            {new Date(item.createdAt).toLocaleDateString()}{' '}
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        )}
        <View style={styles.row}>
          <Text style={styles.label}>Vin: </Text>
          <Text style={styles.cardTitle}>{item.vin}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.value}>{item.status}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Generator Id: </Text>
          <Text style={styles.value}>{item.generatorId}</Text>
        </View>
        {item.generator && item.generator.imagen && (
          <Image
            source={{uri: item.generator.imagen}}
            style={styles.generatorImage}
          />
        )}
      </View>
    </Pressable>
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
          <Text style={styles.subtitle}>Latest reports</Text>
        </View>
        <View>
          {loading && <ActivityIndicator size="large" color="#00ACC1" />}
        </View>
        <View style={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#00ACC1" />
          ) : (
            <FlatList
              data={reports}
              renderItem={renderItem}
              keyExtractor={item => item.ids}
              contentContainerStyle={styles.contentContainer}
              onEndReached={loadMoreData}
              onEndReachedThreshold={0.5}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshData}
                  colors={['#00ACC1']}
                />
              }
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
    alignItems: 'center',
    marginBottom: 5,
    flexWrap: 'wrap',
    marginHorizontal: 10,
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
    width: '100%',
    height: height * 0.25,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
  listContainer: {
    flex: 1,
    marginTop: -70,
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  generatorImage: {
    width: '40%',
    height: 150,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: 'center',
  },
});

export default HomeScreen;
