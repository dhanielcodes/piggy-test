import React from 'react';
import Svg from 'react-native-svg';
import {Path} from 'react-native-svg';

interface Icon {
  color?: string;
}
export default function ProfileIcon({
  color = 'black',
}: Icon): React.JSX.Element {
  return (
    <Svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.18732 15.2327C2.18732 14.1912 2.60105 13.1924 3.33749 12.456C4.07394 11.7195 5.07277 11.3058 6.11426 11.3058H13.9681C15.0096 11.3058 16.0085 11.7195 16.7449 12.456C17.4813 13.1924 17.8951 14.1912 17.8951 15.2327C17.8951 15.7535 17.6882 16.2529 17.32 16.6211C16.9518 16.9893 16.4524 17.1962 15.9316 17.1962H4.15079C3.63004 17.1962 3.13063 16.9893 2.7624 16.6211C2.39418 16.2529 2.18732 15.7535 2.18732 15.2327Z"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="2.45434"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0412 7.37881C11.6678 7.37881 12.9864 6.0602 12.9864 4.43361C12.9864 2.80702 11.6678 1.4884 10.0412 1.4884C8.41459 1.4884 7.09598 2.80702 7.09598 4.43361C7.09598 6.0602 8.41459 7.37881 10.0412 7.37881Z"
        stroke={color}
        stroke-opacity="0.56"
        stroke-width="2.45434"
      />
    </Svg>
  );
}
