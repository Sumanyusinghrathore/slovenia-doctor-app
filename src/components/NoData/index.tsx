// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import Label from '../Label/Labels';
// import {FONTS} from '../../constants';
// import {useTranslation} from 'react-i18next';
// import i18n from '../../i18n.js/i18n';
// import {fontFamilyDynamic} from '../../helper/function';

// const NoData: React.FC = () => {
//   const {t} = useTranslation();
//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.text}>No Data Available</Text> */}
//       <Label
//         align={'center'}
//         family={fontFamilyDynamic()}
//         size={i18n.language === 'hi' ? 22 : 20}
//         color={'#333'}
//         labelContent={t('No_Data_Found')}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   text: {
//     fontSize: 18,
//     color: '#333',
//   },
// });

// export default NoData;
