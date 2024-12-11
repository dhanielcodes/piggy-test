/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import SkeletonCard from './SkeletonCard';
import {screenHeight} from '@src/utils/Sizes';

export default function LoadingStack({loading}: any) {
  return (
    loading && (
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
    )
  );
}

const styles = StyleSheet.create({
  cardDisplaySection: {
    marginTop: screenHeight(0.008),
    marginBottom: screenHeight(0.03),
  },
});
