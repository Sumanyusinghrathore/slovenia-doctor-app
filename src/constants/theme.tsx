import { Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

// Define types for COLORS, SIZES, FONTS, and gradients
type GradientType =
  | 'GREEN'
  | 'PURPLE'
  | 'VIOLET'
  | 'TEXT'
  | 'RED'
  | 'BLACK'
  | 'WHITE'
  | 'YELLOW_INTERESTED'
  | 'TRANSPARENT';

export const COLORS = {
  // base colors
  primary: '#0c2d57',
  gradientprimary: '#0c2d57', // Purple
  gradientprimary1: '#6C63FF', // Soft violet (NEW – bridge color)
  gradientprimary2: '#7F7FFF', // Royal blue
  primary2: '#F3F3F3',
  primary3: '#FFFCF4',
  secondary: '#3ABCEC',
  secondary2: '#75E7F0',
  jobColor: '#5097A4',
  purple: '#9747FF',
  subscriptionColor: '#575082',
  newLaunch: '#2F3C4F',
  marketColor: '#1064d5',
  coffeeColor: '#9F7934',
  adminPrimary: '#FFAC12',
  adminSecondary: '#F89500',
  gray: '#C2C2C2', // gray
  third: '#7C8BA0', // gray
  textColor: '#202020',
  inputTextColor: '#999999',
  inputBg: '#EFFBFF',
  newGray: '#9C9797',
  textGray: '#505050',
  // colors
  black: '#000',
  black2: '#303030',
  black3: '#212121',
  lightBlack: '#2121211A',
  white: '#fff',
  red: '#dd2918',
  blue: '#0000FF',
  RoyalBlue: '#2e64e5',
  MoodyBlue: '#7474d2',
  lightGray: '#F5F5F6',
  lightGray2: '#DCDCDC',
  transparent: 'transparent',
  darkgray: '#898C95',
  opacity: '#f2f2f2',
  newColor: '#F4F5F7',
  lawngreen: '#00FF00',
  success: '#47b913',
  green: '#47b913',
  lightPrimary: '#fbcba6',
  regularText50: '#21212180',
  divider: '#E9E9E9',
  bottomForm: '#F4F4F4',
  borderColor: '#EBEBEB',
  TabelHeaderColor: '#CCCCCC',
} as const; // Use `as const` for immutable object type inference

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
} as const;

export const FONTS = {
  largeTitle: {
    fontFamily: 'Axiforma-regular',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  rupeeSymbol: '₹',
  h1: { fontFamily: 'Axiforma-Black', fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: 'Axiforma-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Axiforma-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Axiforma-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Axiforma-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Axiforma-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Axiforma-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Axiforma-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Axiforma-Regular',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
  AxiformaBlack: 'Axiforma-Black',
  AxiformaBold: 'Axiforma-Bold',
  AxiformaLight: 'Axiforma-Light',
  AxiformaMedium: 'Axiforma-Medium',
  AxiformaRegular: 'Axiforma-Regular',
  AxiformaThin: 'Axiforma-Thin',
  AxiformaItalic: 'Axiforma-Italic',
  AxiformaSemiBold: 'Axiforma-SemiBold',
  AxiformaSemiBoldItalic: 'Axiforma-SemiBoldItalic',
  Special_font: 'TrajanPro-Regular',
} as const;

// REMOVE_STRING function with proper typing
export const REMOVE_STRING = (value: number): string => {
  return `${FONTS.rupeeSymbol}${value.toFixed(2)}`;
};

// Gradients
const blueGradient: [string, string] = ['#FFCC49', '#DCA413'];
const greenGradient: [string, string] = ['#75B5EB', '#75EC99'];
const purpleGradient: [string, string] = ['#EB77CA', '#968FFB'];
const violetGradient: [string, string] = ['#3ABAEB', '#4D66E2'];
const textColor: [string, string] = ['#21212180', '#21212180'];
const blackColor: [string, string] = ['#323643', '#323643'];
const whiteColor: [string, string] = ['#fff', '#fff'];
const textRed: [string, string] = ['#FF5245', '#EE0029'];
const yellowInterested: [string, string] = ['#FF8F00', '#FF8F00'];
const transparent: [string, string] = ['transparent', 'transparent'];

export const gradientColors: any = (
  changeColor: GradientType,
): [string, string] => {
  switch (changeColor) {
    case 'GREEN':
      return greenGradient;
    case 'PURPLE':
      return purpleGradient;
    case 'VIOLET':
      return violetGradient;
    case 'TEXT':
      return textColor;
    case 'RED':
      return textRed;
    case 'BLACK':
      return blackColor;
    case 'WHITE':
      return whiteColor;
    case 'YELLOW_INTERESTED':
      return yellowInterested;
    case 'TRANSPARENT':
      return transparent;
    default:
      return blueGradient;
  }
};

const appTheme = { COLORS, SIZES, FONTS, REMOVE_STRING, gradientColors };

export default appTheme;
