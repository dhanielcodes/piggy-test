declare module '*.svg' {
    import React from 'react';
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
}
declare module 'react-native-vector-icons';
declare module 'react-native-vector-icons/AntDesign';
declare module 'react-native-vector-icons/FontAwesome';
