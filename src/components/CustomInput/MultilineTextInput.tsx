import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextStyle,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { FONTS, COLORS } from '../../constants';
import { dynamicStyles } from '../../constants/genericStyles';
import Label from '../Label/Labels';

interface InputComponentProps extends TextInputProps {
  placeholder?: string;
  error?: string | boolean;
  inputContainerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  editable?: boolean;
  multiline?: boolean;
  onBlur?: () => void;
  errorMessage?: string;
  placeholderTextColor?: string;
  cursorColor?: string;
  onPressIn?: () => void;
  leftIconContainerStyle?: ViewStyle;
  renderLeftIcon?: React.ReactNode;
  renderRightIcon?: React.ReactNode;
  topLabel?: string;
  viewStyle?: ViewStyle;
}

const MultilinetextInput: React.FC<InputComponentProps> = ({
  placeholder,
  error,
  errorMessage,
  onChangeText,
  value,
  keyboardType,
  maxLength,
  onSubmitEditing,
  secureTextEntry,
  multiline,
  autoCapitalize,
  onKeyPress,
  autoFocus,
  numberOfLines,
  onBlur,
  editable,
  placeholderTextColor,
  cursorColor,
  onPressIn,
  leftIconContainerStyle,
  renderLeftIcon,
  renderRightIcon,
  viewStyle,
  inputContainerStyle,
  inputStyle,
  iconContainerStyle,
  topLabel,
}) => {
  return (
    <View style={[viewStyle]}>
      <View style={{flexDirection: 'row'}}>
        {topLabel && <Label labelContent={topLabel} size={14} mb={7} />}
        <Label labelContent="*" color="red" size={13} mh={2}></Label>
      </View>
      <View style={[dynamicStyles.ph(0), styles.inputWrapper, inputContainerStyle, error && styles.errorBorder]}>
        {renderLeftIcon && <View style={leftIconContainerStyle}>{renderLeftIcon}</View>}

        <TextInput
          placeholder={placeholder ?? ''}
          editable={editable}
          onPressIn={onPressIn}
          cursorColor={cursorColor}
          placeholderTextColor={placeholderTextColor ?? COLORS.third}
          style={[styles.inputStyle, inputStyle]}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize ?? 'none'}
          multiline={multiline}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          onBlur={onBlur}
        />

        {renderRightIcon && <View style={iconContainerStyle}>{renderRightIcon}</View>}
      </View>
    </View>
  );
};

export default MultilinetextInput;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderRadius: 15,
    borderBottomWidth: 0,
    borderColor: COLORS.primary2,
    backgroundColor: COLORS.primary2,
    paddingHorizontal: 10,
    height: 100,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    textAlignVertical: 'top', // Centers text vertically
  },
  errorBorder: {
    borderColor: COLORS.red,
    borderWidth: 1,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 5,
  },
});
