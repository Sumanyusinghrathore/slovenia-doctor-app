// import React from 'react';
// import {View} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import SelectIcon from '../Routine/SelectIcon';
// import {COLORS, FONTS} from '../../constants';
// import Label from '../Label/Labels';
// import {useTranslation} from 'react-i18next';
// import i18n from '../../i18n.js/i18n';
// import {fontFamilyDynamic} from '../../helper/function';

// interface CustomFormHeaderProps {
//   title?: string;
//   navigation?: any; // You can replace 'any' with a more specific type if available
//   onPress?: () => void;
//   hideSkip?: boolean;
//   customIcon?: any;
//   onBackPress?: () => void;
// }

// const CustomFormHeader: React.FC<CustomFormHeaderProps> = ({
//   title,
//   navigation,
//   onPress,
//   hideSkip,
//   customIcon,
//   onBackPress,
// }) => {
//   const {t} = useTranslation();
//   return (
//     <SafeAreaView
//       edges={['top']}
//       style={{
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//         paddingVertical: 10,
//         paddingHorizontal: 18,
//       }}>
//       <View style={{flexDirection: 'row', alignItems: 'center'}}>
//         <SelectIcon
//           name="arrow-back-outline"
//           type="ionicon"
//           size={28}
//           color={COLORS.black}
//           containerStyle={{marginRight: 10}}
//           onPress={() => {
//             if (navigation?.goBack) {
//               navigation.goBack();
//             } else if (onBackPress) {
//               onBackPress();
//             }
//           }}
//         />
//         <Label
//           color={COLORS.black}
//           size={20}
//           family={fontFamilyDynamic()}
//           fw="500"
//           labelContent={t(title)}
//         />
//       </View>
//       {!['Members', 'Matrimonial', 'Profile'].includes(title) && !hideSkip && (
//         <Label
//           labelContent={t('Skip')}
//           onPress={onPress}
//           color={COLORS.primary}
//           family={fontFamilyDynamic()}
//           size={i18n.language === 'hi' ? 18 : 16}
//           underLine
//         />
//       )}
//       {['Members', 'Matrimonial'].includes(title) ? (
//         <SelectIcon
//           name="search"
//           type="ionicon"
//           size={30}
//           color={COLORS.primary}
//           onPress={onPress}
//         />
//       ) : (
//         customIcon
//       )}
//     </SafeAreaView>
//   );
// };

// export default CustomFormHeader;
