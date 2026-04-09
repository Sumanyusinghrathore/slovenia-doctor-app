import React from 'react';
import { Controller } from 'react-hook-form';
import InputComponent from '../CustomInput/InputComponent';
import { COLORS } from '../../constants';
import { View, ViewStyle } from 'react-native';
import { IconProps } from '@rneui/base';
import MultilineInput from '../CustomInput/MultilineInput';
import MultilineTextInput from '../CustomInput/MultilineTextInput';

interface UseInputProps {
  max?: number;
  min?: number;
  name: string;
  control: any;
  pattern?: RegExp;
  editable?: boolean;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  removeRegex?: RegExp;
  keyboardType?: 'default' | 'number-pad' | 'email-address' | 'phone-pad';
  defaultValue?: string;
  ruleMinLength?: number;
  ruleMaxLength?: number;
  numberOfLines?: number;
  renderLeftIcon?: () => JSX.Element;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  iconName?: string;
  error?: boolean;
  leftIconName?: string;
  iconContainerStyle?: ViewStyle;
  leftIconContainerStyle?: ViewStyle;
  inputOnPress?: () => void;
  secureTextEntry?: boolean;
  iconOnpress?: () => void;
  renderRightIcon?: () => JSX.Element;
  topLabel?: string;
  placeholderTextColor?: string;
  onPress?: () => void;
  viewStyle?: ViewStyle;
  errorMessage?: string;
  inputStyle?: ViewStyle;
}

const UseMultiline: React.FC<UseInputProps> = ({
  max,
  min,
  name,
  control,
  pattern,
  editable,
  required,
  maxLength,
  multiline = false,
  placeholder,
  removeRegex,
  keyboardType = 'default',
  defaultValue,
  ruleMinLength,
  ruleMaxLength,
  numberOfLines,
  renderLeftIcon,
  autoCapitalize,
  containerStyle,
  inputContainerStyle,
  iconName,
  error,
  leftIconName,
  iconContainerStyle,
  leftIconContainerStyle,
  inputOnPress,
  secureTextEntry,
  iconOnpress,
  renderRightIcon,
  topLabel,
  placeholderTextColor,
  onPress,
  viewStyle,
  errorMessage,
  inputStyle,
}) => {
  return (
    <View style={viewStyle}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          min: min,
          max: max,
          required: required ?? true,
          minLength: ruleMinLength,
          maxLength: ruleMaxLength,
          pattern: pattern || undefined,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MultilineTextInput
            inputStyle={inputStyle}
            onBlur={onBlur}
            topLabel={topLabel}
            onPress={onPress}
            iconName={iconName}
            viewStyle={viewStyle}
            editable={editable}
            placeholderTextColor={placeholderTextColor}
            multiline={multiline}
            renderLeftIcon={renderLeftIcon}
            iconContainerStyle={iconContainerStyle}
            leftIconContainerStyle={leftIconContainerStyle}
            maxLength={maxLength}
            onChangeText={(text) => {
              if (removeRegex) {
                onChange(text.replace(removeRegex, ''));
              } else {
                onChange(text);
              }
            }}
            secureTextEntry={secureTextEntry}
            leftIconName={leftIconName}
            errorMessage={errorMessage || (error ? 'This field is required' : undefined)}
            placeholder={placeholder}
            onPressIn={inputOnPress}
            renderRightIcon={renderRightIcon}
            iconOnpress={iconOnpress}
            keyboardType={keyboardType}
            numberOfLines={multiline ? numberOfLines || 3 : 1}
            autoCapitalize={autoCapitalize}
            containerStyle={containerStyle}
            inputContainerStyle={{
              borderColor: error ? COLORS.red : COLORS.primary,
              borderWidth: error ? 1 : 0,
              borderBottomWidth: error ? 1 : 0,
              ...inputContainerStyle,
            }}
            value={value}
          />
        )}
      />
    </View>
  );
};

export default UseMultiline;
