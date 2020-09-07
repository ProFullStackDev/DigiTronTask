import {Platform, StatusBar, Dimensions, PixelRatio} from 'react-native';

const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;

const scale = width / 320;

var pixelRatio = PixelRatio.get();

const deviceHeight =
  Platform.OS === 'android' ? standardLength - offset : standardLength;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function Percentage(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

export function Value(fontSize, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

export const pixel = size => {
  if (pixelRatio == 2) {
    return size;
  }
  return size * 1.15;
};
