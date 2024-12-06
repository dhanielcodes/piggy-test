import { Dimensions } from 'react-native';

export const {height, width} = Dimensions.get('window');

export const screenWidth = (size: number) => {
    return width * size;
};
export const screenHeight = (size: number) => {
    return height * size;
};

export const screenSize = (screenWidthSize: number, screenHeightSize:number) =>{
    return {
        width:width * screenWidthSize,
        height:height * screenHeightSize,
    };
};
