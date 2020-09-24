import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  DEVICE_WIDTH: width,
  DEVICE_HEIGHT: height,
  isSmallDevice: width < 375,
};
