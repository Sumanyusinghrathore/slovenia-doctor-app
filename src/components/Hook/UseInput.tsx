import React from 'react';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants';
import { IconProps } from '@rneui/themed';
import { ViewStyle } from 'react-native';
import InputComponent from '../CustomInput/InputComponent';

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
  removeRegex?: boolean;
  keyboardType?: any;
  defaultValue?: string;
  ruleMinLength?: number;
  ruleMaxLength?: number;
  numberOfLines?: number;
  renderLeftIcon?: IconProps;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  iconName?: string;
  leftIconName?: string;
  iconContainerStyle?: ViewStyle;
  leftIconContainerStyle?: ViewStyle;
  inputOnPress?: () => void;
  secureTextEntry?: boolean;
  iconOnpress?: () => void;
  renderRightIcon?: IconProps;
  topLabel?: string;
  placeholderTextColor?: string;
  viewStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  rules?: any;
  topLabelColor?: string;
}

const UseInput: React.FC<UseInputProps> = ({
  max,
  min,
  name,
  control,
  pattern,
  editable = true,
  required = false,
  maxLength,
  multiline,
  placeholder,
  removeRegex,
  keyboardType,
  defaultValue = '',
  ruleMinLength,
  ruleMaxLength,
  numberOfLines,
  renderLeftIcon,
  autoCapitalize = 'none',
  containerStyle,
  inputContainerStyle,
  iconName,
  leftIconName,
  iconContainerStyle,
  leftIconContainerStyle,
  inputOnPress,
  secureTextEntry,
  iconOnpress,
  renderRightIcon,
  topLabel,
  placeholderTextColor,
  viewStyle,
  inputStyle,
  rules,
  topLabelColor,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required ? true : false,
        min,
        max,
        minLength: ruleMinLength,
        maxLength: ruleMaxLength,
        pattern: pattern
          ? {
              value: pattern,
              message: 'Invalid format',
            }
          : undefined,
        ...rules,
      }}
      render={({
        field: { onChange, onBlur, value },
        fieldState,
        formState,
      }) => {
        const showError = formState.isSubmitted && !!fieldState.error;

        return (
          <InputComponent
            /* ===== LABEL ===== */
            topLabel={topLabel}
            onChange={onChange}
            topLabelColor={topLabelColor}
            required={required}
            /* ===== INPUT ===== */
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            editable={editable}
            multiline={multiline}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            numberOfLines={numberOfLines}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            onBlur={onBlur}
            onPressIn={inputOnPress}
            /* ===== CHANGE HANDLING ===== */
            onChangeText={(text: string) => {
              if (removeRegex) {
                onChange(text);
              } else {
                const regex = keyboardType?.includes('number-pad')
                  ? /^[0-9]*$/
                  : /^[A-Za-z0-9.,\s@]*$/;

                if (regex.test(text)) {
                  onChange(text);
                }
              }
            }}
            /* ===== ICONS ===== */
            renderLeftIcon={renderLeftIcon}
            renderRightIcon={renderRightIcon}
            iconName={iconName}
            leftIconName={leftIconName}
            iconOnpress={iconOnpress}
            iconContainerStyle={iconContainerStyle}
            leftIconContainerStyle={leftIconContainerStyle}
            /* ===== STYLES ===== */
            viewStyle={viewStyle}
            containerStyle={containerStyle}
            inputStyle={inputStyle}
            inputContainerStyle={{
              borderWidth: 1.5,
              borderColor: showError ? COLORS.red : COLORS.gray,
              ...inputContainerStyle,
            }}
          />
        );
      }}
    />
  );
};

export default UseInput;
