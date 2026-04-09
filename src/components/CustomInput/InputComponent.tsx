import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Input, IconProps } from '@rneui/themed';
import { FONTS, COLORS } from '../../constants';
import { dynamicStyles } from '../../constants/genericStyles';
import Label from '../Label/Labels';
import SelectIcon from '../Routine/SelectIcon';

interface InputComponentProps extends TextInputProps {
  placeholder?: string;
  iconName?: string;
  iconSize?: number;
  errorStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onChangeText?: (text: string) => void;
  value?: string;
  iconOnpress?: () => void;
  iconColor?: string;
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onKeyPress?: TextInputProps['onKeyPress'];
  autoFocus?: boolean;
  numberOfLines?: number;
  onblur?: () => void;
  errorMessage?: string | undefined;
  iconContainerStyle?: ViewStyle;
  onChange?: (e: any) => void;
  textContentType?: TextInputProps['textContentType'];
  editable?: boolean;
  disabled?: boolean;
  placeholderTextColor?: string;
  leftIconName?: string;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  cursorColor?: string;
  onPressIn?: () => void;
  leftIconContainerStyle?: ViewStyle;
  leftIconColor?: string;
  leftIconType?: string;
  rightIconStyle?: ViewStyle;
  renderLeftIcon?: IconProps;
  renderRightIcon?: IconProps;
  inputOnPress?: () => void;
  ref?: React.Ref<typeof Input>;
  topLabel?: string;
  viewStyle?: ViewStyle;
  required?: boolean;
  topLabelColor?: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  placeholder,
  iconName,
  iconSize,
  errorStyle,
  inputContainerStyle,
  inputStyle,
  containerStyle,
  onChangeText,
  value,
  keyboardType,
  maxLength,
  onSubmitEditing,
  ref,
  iconOnpress,
  secureTextEntry,
  multiline,
  iconColor,
  autoCapitalize,
  onKeyPress,
  autoFocus,
  numberOfLines,
  onblur,
  errorMessage,
  iconContainerStyle,
  onChange,
  textContentType,
  editable,
  disabled,
  placeholderTextColor,
  leftIconName,
  textAlignVertical,
  cursorColor,
  onPressIn,
  leftIconContainerStyle,
  leftIconColor,
  leftIconType,
  rightIconStyle,
  renderLeftIcon,
  renderRightIcon,
  inputOnPress,
  topLabel,
  viewStyle,
  required,
  topLabelColor,
}) => {
  return (
    <View style={{ ...viewStyle, width: '100%', marginTop: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        {topLabel && (
          <Label
            labelContent={topLabel}
            mb={5}
            family={FONTS.AxiformaRegular}
            size={14}
            color={topLabelColor ?? COLORS.white}
          />
        )}
        {required && (
          <Label
            labelContent="*"
            color={COLORS.red}
            mh={2}
            family={FONTS.AxiformaRegular}
            size={13}
          />
        )}
      </View>

      <Input
        placeholder={placeholder ?? ''}
        editable={editable}
        onPressIn={onPressIn}
        cursorColor={cursorColor}
        placeholderTextColor={placeholderTextColor ?? COLORS.third}
        containerStyle={[dynamicStyles.ph(0), { ...containerStyle }]}
        textAlignVertical={textAlignVertical}
        inputContainerStyle={[
          styles.inputContainerStyle,

          { ...inputContainerStyle },
        ]}
        leftIcon={
          renderLeftIcon ?? {
            name: leftIconName,
            type: leftIconType ?? 'ionicon',
            color: leftIconColor ?? COLORS.primary,
            size: iconSize ?? 20,
            onPress: iconOnpress,
            containerStyle: leftIconContainerStyle ?? {
              marginLeft: 10,
            },
          }
        }
        inputStyle={[styles.inputStyle, { ...inputStyle }]}
        errorStyle={{
          ...errorStyle,
          ...styles.inputStyle,
          color: COLORS.red,
          marginTop: 10,
          display: errorMessage ? 'none' : 'none',
        }}
        rightIcon={
          renderRightIcon ?? {
            name: iconName,
            type: 'ionicon',
            color: iconColor ?? COLORS.primary,
            size: iconSize ?? 20,
            onPress: iconOnpress,
            containerStyle: rightIconStyle ?? iconContainerStyle,
          }
        }
        onChange={onChange}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
        multiline={multiline}
        disabled={disabled}
        onPress={inputOnPress}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
        numberOfLines={numberOfLines}
        onBlur={onblur}
        errorMessage={errorMessage}
        textContentType={textContentType}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 15,
    // marginLeft: 5,
    minHeight: 55,
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
  },
  inputContainerStyle: {
    borderRadius: 15,
    // borderColor: COLORS.primary2,
    backgroundColor: COLORS.white,
  },
});
