/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

interface ItemCard {
  title?: any;
  image?: string;
  color?: string;
}

export default function ItemCard({
  title,
  image,
  color,
}: ItemCard): React.JSX.Element {
  const hexToRgba = (hex?: any, alpha = 0.25) => {
    /*   if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)) {
      throw new Error('Invalid hex color');
    } */
    const sanitizedHex =
      hex.length === 4
        ? hex.replace(/#([A-Fa-f0-9])/g, '$1$1') // Convert shorthand to full
        : hex.replace('#', '');
    const bigint = parseInt(sanitizedHex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  return (
    <View
      style={[
        styles.card,
        {
          borderColor: color,
          backgroundColor: hexToRgba(color),
        },
      ]}>
      <Image
        source={{
          uri: image,
        }}
        style={{
          width: '42%',
          borderRadius: 10,
          height: '42%',
        }}
      />
      <Text style={styles.text}>
        {title?.length > 19 ? `${title?.slice(0, 19)}...` : title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    width: '100%',
    height: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    width: '100%',
  },
});
