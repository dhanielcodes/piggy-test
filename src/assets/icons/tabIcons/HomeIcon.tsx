import React from 'react';
import Svg from 'react-native-svg';
import {Path} from 'react-native-svg';

interface Icon {
  color?: string;
}
export default function HomeIcon({color = 'black'}: Icon): React.JSX.Element {
  return (
    <Svg
      width="27"
      height="25"
      viewBox="0 0 27 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.96284 9.41521L13.504 2.54306L23.0451 9.41521V20.2143C23.0451 20.735 22.8218 21.2345 22.4241 21.6027C22.0265 21.9709 21.4872 22.1778 20.9249 22.1778H6.0831C5.52077 22.1778 4.98148 21.9709 4.58385 21.6027C4.18623 21.2345 3.96284 20.735 3.96284 20.2143V9.41521Z"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="1.96347"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.3237 22.1778V12.3604H16.6845V22.1778"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="1.96347"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
