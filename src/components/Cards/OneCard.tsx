import {Linking, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES, genericStyles} from '../../constants';
import Label from '../Label/Labels';
import SelectIcon from '../Routine/SelectIcon';
import CustomImg from '../CustomImg/CustomImg';
import TouchableComponent from '../Routine/TouchableComponent';
import {dynamicStyles} from '../../constants/genericStyles';

interface OneCardProps {
  roundBG: string;
  shortName: string;
  name: string;
  address: string;
  number: string;
  onPress: () => void;
  onMap: () => void;
  editIconHide?: boolean;
  onEdit?: () => void;
  association?: string;
  unitTarget?: string;
  from?: string;
  to?: string;
  shadowOff?: boolean;
  underLineTextColor?: string;
  requirementType?: string;
  requirementDetails?: string;
  nameStyle?: object;
}

const OneCard: React.FC<OneCardProps> = ({
  roundBG,
  shortName,
  name,
  address,
  number,
  onPress,
  onMap,
  editIconHide,
  onEdit,
  association,
  unitTarget,
  from,
  to,
  shadowOff,
  underLineTextColor,
  requirementType,
  requirementDetails,
  nameStyle,
}) => {
  return (
    <View style={[styles.firstContainer, !shadowOff && genericStyles.shadow]}>
      <View style={[genericStyles.rowWithCenterAndSB, dynamicStyles.mb(5)]}>
        <View style={genericStyles.rowWithCenter}>
          <View
            style={[
              styles.pinkContainer,
              {backgroundColor: roundBG},
              genericStyles.shadow,
            ]}>
            <Label size={16} color={COLORS.white} labelContent={shortName} />
          </View>
          <Label
            textStyle={{width: '80%'}}
            labelContent={name}
            size={16}
          />
        </View>
        {editIconHide && (
          <SelectIcon
            name={'pencil'}
            onPress={onEdit}
            color={COLORS.darkgray}
            type={'material-community'}
          />
        )}
      </View>
      {association && (
        <View
          style={[
            genericStyles.row,
            dynamicStyles.mv(5),
            {width: SIZES.width / 1.7},
          ]}>
          <Label
            size={16}
            color={COLORS.darkgray}
            labelContent={'Association with : '}
          />
          <Label
            size={16}
            textStyle={{width: '85%'}}
            labelContent={association}
          />
        </View>
      )}
      {unitTarget && (
        <View style={[genericStyles.row, dynamicStyles.mv(5)]}>
          <Label
            size={16}
            color={COLORS.darkgray}
            labelContent={'Camps Unit Target : '}
          />
          <Label size={16} labelContent={unitTarget} />
        </View>
      )}

      <View style={[genericStyles.rowWithCenterAndSB, dynamicStyles.mv(5)]}>
        <View style={[genericStyles.row, {width: SIZES.width / 1.8}]}>
          <Label
            size={16}
            color={COLORS.darkgray}
            labelContent={'Address : '}
          />

          <Label onPress={onMap} labelContent={address} size={16} />
        </View>
        {/* <TouchableComponent onPress={() => onMap()} style={{}}>
          <CustomImg
            style={{width: 25, height: 25}}
            source={require('../../assets/images/google-maps.png')}
          />
        </TouchableComponent> */}
      </View>
      {from && to && (
        <View style={[genericStyles.rowWithCenter, dynamicStyles.mv(5)]}>
          <Label size={16} color={COLORS.darkgray} labelContent={'From : '} />
          <Label size={16} labelContent={from} />
          <View style={{width: 10}} />
          <Label size={16} color={COLORS.darkgray} labelContent={'To : '} />
          <Label size={16} labelContent={to} />
        </View>
      )}
      <View style={[genericStyles.rowWithCenter, dynamicStyles.mv(5)]}>
        <Label size={16} color={COLORS.darkgray} labelContent={'Mobile No. '} />
        <Label
          size={16}
          underLine={true}
          onPress={onPress}
          labelContent={number}
          color={underLineTextColor ?? COLORS.red}
        />
      </View>
      {requirementType && (
        <View style={[genericStyles.row, dynamicStyles.mb(5)]}>
          <Label
            size={16}
            color={COLORS.darkgray}
            labelContent={'Requirement Type : '}
          />

          <Label labelContent={requirementType} size={16} />
        </View>
      )}
      {requirementDetails && (
        <View style={[genericStyles.row, {width: SIZES.width / 2}]}>
          <Label
            size={16}
            color={COLORS.darkgray}
            labelContent={'Requirement Detail : '}
          />

          <Label labelContent={requirementDetails} size={16} />
        </View>
      )}
    </View>
  );
};

export default OneCard;

const styles = StyleSheet.create({
  firstContainer: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  pinkContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
