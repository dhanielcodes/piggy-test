import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function SearchIcon(): React.JSX.Element {
  return (
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.2526 12.7395L16.12 16.2386"
        stroke="#FF882E"
        stroke-opacity="0.53"
        stroke-width="2"
        stroke-linecap="round"
      />
      <Path
        d="M7.72 14.5451C11.4314 14.5451 14.44 11.5129 14.44 7.77253C14.44 4.03217 11.4314 1 7.72 1C4.00865 1 1 4.03217 1 7.77253C1 11.5129 4.00865 14.5451 7.72 14.5451Z"
        stroke="#FF882E"
        stroke-opacity="0.44"
        stroke-width="2"
      />
    </Svg>
  );
}
