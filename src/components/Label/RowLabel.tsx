import React from 'react';
import {View} from 'react-native';
import Label from './Labels';
import {COLORS, FONTS, genericStyles} from '../../constants';

interface RowLabelProps {
  color?: string;
  color2?: string;
  viewStye?: object;
  touchStyle?: object;
  touchStyle2?: object;
  firstLabel?: string;
  secondLabel?: string;
  onFirstTouch?: () => void;
  numberOfLines?: number;
  numberOfLines2?: number;
  firstLabelSize?: number;
  secondLabelSize?: number;
  family2?: string;
  align?: string;
  align2?: string;
  onSecondTouch?: () => void;
  rowLabel?: string;
  family1?: string;
  bold2?: string;
  bold1?: string;
}

const RowLabel: React.FC<RowLabelProps> = ({
  color,
  color2,
  viewStye,
  touchStyle,
  touchStyle2,
  firstLabel,
  secondLabel,
  onFirstTouch,
  numberOfLines,
  numberOfLines2,
  firstLabelSize,
  secondLabelSize,
  family2,
  align,
  align2,
  onSecondTouch,
  rowLabel,
  family1,
  bold2,
  bold1,
}) => {
  return (
    <View style={[genericStyles.rowWithCenterAndSB, {...viewStye}]}>
      <View style={genericStyles.rowWithCenter}>
        <Label
          color={color}
          align={align}
          size={firstLabelSize}
          onPress={onFirstTouch}
          textStyle={touchStyle}
          labelContent={firstLabel}
          numberOfLines={numberOfLines}
          family={family1 ?? FONTS.PoppinsRegular400}
          fw={
            bold1 as
              | '100'
              | 'bold'
              | 'normal'
              | '200'
              | '300'
              | '400'
              | '500'
              | '600'
              | '700'
              | '800'
              | '900'
          }
        />
        {rowLabel && (
          <Label
            size={18}
            labelContent={rowLabel}
            color={COLORS.primary}
            family={FONTS.PoppinsRegular400}
          />
        )}
      </View>

      <Label
        family={family2}
        fw={
          bold2 as
            | '100'
            | 'bold'
            | 'normal'
            | '200'
            | '300'
            | '400'
            | '500'
            | '600'
            | '700'
            | '800'
            | '900'
        }
        align={align2}
        color={color2}
        onPress={onSecondTouch}
        size={secondLabelSize}
        textStyle={touchStyle2}
        labelContent={secondLabel}
        numberOfLines={numberOfLines2}
      />
    </View>
  );
};

export default RowLabel;
