/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useContext, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Colors from '@src/config/Colors';
import MainContext, {ContextType} from '@src/context/global.context';
import {screenHeight, screenWidth} from '@src/utils/Sizes';
import ProductCard from '@src/components/ProductCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import SkeletonCard from '@src/components/SkeletonCard';

function Favorites(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.DEFAULT_WHITE,
    flex: 1,
    padding: 16,
  };

  const {favoriteList, getFavorites, loading}: any = useContext(
    MainContext,
  ) as ContextType;

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Text style={styles.title}>Favorites</Text>
        <FlatList
          data={favoriteList}
          style={styles.cardDisplaySection}
          renderItem={({item}) => (
            <View>
              <ProductCard {...item} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins-Light',
                  }}>
                  You haven't picked any favorites{' '}
                  <Icon name="map-pin" size={15} color="#000" />
                </Text>
              </View>
            );
          }}
        />
        {loading && (
          <FlatList
            data={[1, 2, 4, 5, 6, 6]}
            style={styles.cardDisplaySection}
            renderItem={({item}) => (
              <View>
                <SkeletonCard />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Favorites;

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  title: {
    fontSize: screenWidth(0.06),
    fontFamily: 'Poppins-Medium',
  },
  searchTop: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: screenHeight(0.04),
  },
  searchText: {
    fontFamily: 'Poppins-Bold',
  },
  clearText: {
    color: Colors.DEFAULT_GREY,
    marginTop: screenHeight(0.01),
    fontFamily: 'Poppins-Bold',
  },
  historyTab: {
    marginTop: screenHeight(0.01),
  },

  cardDisplaySection: {
    marginTop: screenHeight(0.008),
  },
  cardDisplayTab: {
    aspectRatio: 1,
    width: '47%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  cardDisplayProduct: {
    aspectRatio: 0.8,
    width: '47%',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  pin: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginRight: screenWidth(0.01),
    marginBottom: screenWidth(0.02),
  },
  pinText: {
    color: '#6c6c6c',
    fontFamily: 'Poppins-Medium',
  },
});
