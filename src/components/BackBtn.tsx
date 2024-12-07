import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Svg, Path, Circle} from 'react-native-svg';

interface BackProp {
  width?: any;
  height?: any;
  onPress?: any;
}

const BackBtn = ({width = '24', height = '24', onPress}: BackProp) => {
  const navigation = useNavigation();

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          navigation.goBack();
        }
      }}>
      <Circle cx="17" cy="17" r="17" fill="#F5F5F5" />
      <Path
        d="M12.5291 16.9767C12.5283 16.5191 12.6176 16.0658 12.7921 15.6428C12.9666 15.2198 13.2227 14.8353 13.5459 14.5113L19.2359 8.82128C19.367 8.69013 19.5449 8.61646 19.7304 8.61646C19.9159 8.61646 20.0937 8.69013 20.2249 8.82128C20.356 8.95242 20.4297 9.13029 20.4297 9.31576C20.4297 9.50122 20.356 9.67909 20.2249 9.81024L14.5349 15.5003C14.1436 15.892 13.9238 16.423 13.9238 16.9767C13.9238 17.5304 14.1436 18.0615 14.5349 18.4532L20.2249 24.1432C20.356 24.2744 20.4297 24.4522 20.4297 24.6377C20.4297 24.8232 20.356 25.001 20.2249 25.1322C20.0937 25.2633 19.9159 25.337 19.7304 25.337C19.5449 25.337 19.367 25.2633 19.2359 25.1322L13.5459 19.4422C13.2227 19.1182 12.9666 18.7337 12.7921 18.3106C12.6176 17.8876 12.5283 17.4343 12.5291 16.9767Z"
        fill="black"
      />
    </Svg>
  );
};

export default BackBtn;
