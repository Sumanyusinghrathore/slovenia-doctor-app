import {View, StyleSheet, Platform, Alert, ScrollView} from 'react-native';
import {COLORS} from '../../constants';
import SelectIcon from '../Routine/SelectIcon';
import {dynamicStyles, genericStyles} from '../../constants/genericStyles';
// import Info from '../../assets/svg/info.svg';
// import Gallery from '../../assets/svg/gallery.svg';
// import Announcement from '../../assets/svg/anoucment.svg';
// import Media from '../../assets/svg/media.svg';
// import Contact from '../../assets/svg/contact.svg';
// import Rate from '../../assets/svg/rate.svg';
import Logout from '../../assets/svg/logout.svg';
import Enquire from '../../assets/svg/enquire.svg';
import Label from '../Label/Labels';
import Arrow from '../../assets/svg/arrow.svg';
import {Divider} from '@rneui/themed';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useApp} from '../../context/AppContext';
import TouchableComponent from '../Routine/TouchableComponent';
import CustomImg from '../CustomImg/CustomImg';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props: any) => {
  const {setUserData} = useApp();
   const navigation = useNavigation<any>();
  const options = [
    // {icon: Info, title: 'About Us'},
    // {icon: Gallery, title: 'Gallery/Achievement'},
    {icon: Enquire, title: 'My Enquiries', navigation: 'My Enquiries'},
    // {icon: Announcement, title: 'Daily Social Media Posts'},
    // {icon: Media, title: 'Video/Photos'},
    // {icon: Contact, title: 'Contact Us'},
    // {icon: Rate, title: 'Rate Us'},
    {icon: Logout, title: 'Log Out'},
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <SelectIcon
          size={30}
          name={'window-close'}
          type={'material-community'}
          containerStyle={styles.icon}
          onPress={() => props.navigation.closeDrawer()}
        />
        <CustomImg
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          containerStyle={{alignSelf: 'center'}}
        />
        <Divider
          style={dynamicStyles.mt(20)}
          color={COLORS.divider}
          width={1}
        />
        <View style={dynamicStyles.ph(20)}>
          {options.map((i, d) => {
            return (
              <TouchableComponent
                key={d}
                onPress={() => {
                  if (i?.title === 'Log Out') {
                    Alert.alert('Log Out', 'Are you sure you want to logout', [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'LogOut', onPress: () => setUserData(null)},
                    ]);
                  } else if (i?.navigation) {
                    props?.navigation?.navigate(i?.navigation);
                  }
                }}
                style={{...styles.options, borderTopWidth: d == 0 ? 0 : 0.5}}>
                <View style={genericStyles.rowWithCenterAndSB}>
                  <View style={genericStyles.rowWithCenter}>
                    <i.icon />
                    <Label
                      color={COLORS.textColor}
                      labelContent={i?.title}
                      textStyle={dynamicStyles.ml(20)}
                    />
                  </View>
                  <Arrow />
                </View>
              </TouchableComponent>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default CustomDrawerContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopRightRadius: 50,
    borderBottomEndRadius: 50,
  },
  options: {
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderColor: COLORS.divider,
  },
  icon: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  image: {
    width: 160,
    height: 130,
    resizeMode: 'contain',
  },
});
