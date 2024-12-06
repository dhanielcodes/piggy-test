import React from 'react';
import Svg from 'react-native-svg';
import {Path} from 'react-native-svg';

interface Icon {
  color?: string;
}
export default function TrendIcon({color = 'black'}: Icon): React.JSX.Element {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M17.3996 1.50668H2.67361C2.28305 1.50668 1.90849 1.66183 1.63232 1.938C1.35615 2.21417 1.201 2.58873 1.201 2.97929V17.7053C1.201 18.0959 1.35615 18.4704 1.63232 18.7466C1.90849 19.0228 2.28305 19.1779 2.67361 19.1779H17.3996C17.7902 19.1779 18.1648 19.0228 18.4409 18.7466C18.7171 18.4704 18.8722 18.0959 18.8722 17.7053V2.97929C18.8722 2.58873 18.7171 2.21417 18.4409 1.938C18.1648 1.66183 17.7902 1.50668 17.3996 1.50668Z"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="1.96347"
        stroke-linejoin="round"
      />
      <Path
        d="M4.85302 13.2065L7.62985 10.4297L9.78378 12.5782L14.9453 7.39713"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="1.96347"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.0183 7.39713H14.9453V11.3241"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="1.96347"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
