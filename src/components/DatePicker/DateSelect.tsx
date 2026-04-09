import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import UseInput from '../Hook/UseInput';
import { COLORS } from '../../constants';
import { dynamicStyles } from '../../constants/genericStyles';

interface DateSelectProps {
  onPress: () => void;
  control: any;
  name: string;
  onError: boolean;
  disabled: boolean;
  placeholder: string;
  style?: ViewStyle;
}

const DateSelect: React.FC<DateSelectProps> = ({
  onPress,
  control,
  name,
  onError,
  disabled,
  placeholder,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      disabled={disabled}
      activeOpacity={0.8}>
      {control && (
        <UseInput
          name={name}
          editable={false}
          control={control}
          inputStyle={dynamicStyles.ml(-8)}
          placeholder={placeholder}
          iconName="calendar"
          inputContainerStyle={{
            borderColor: onError ? COLORS.red : COLORS.primary,
          }}
          viewStyle={{}} // Provide an appropriate viewStyle
          errorMessage={onError ? 'Error message' : ''} // Provide an appropriate errorMessage
        />
      )}
    </TouchableOpacity>
  );
};

export default DateSelect;
