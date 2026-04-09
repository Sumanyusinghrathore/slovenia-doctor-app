import React from 'react';
import {Controller} from 'react-hook-form';
import InputComponent from '../CustomInput/InputComponent';
import {COLORS} from '../../constants';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {IconProps} from '@rneui/base';

interface ImagePickerInputProps {
  max?: number;
  min?: number;
  name?: any;
  control?: any;
  pattern?: RegExp;
  editable?: boolean;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
  placeholder?: string;
  removeRegex?: RegExp;
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
  error?: string | boolean;
  leftIconName?: string;
  iconContainerStyle?: ViewStyle;
  leftIconContainerStyle?: ViewStyle;
  inputOnPress?: () => void;
  onPress?: () => void;
  secureTextEntry?: boolean;
  iconOnpress?: () => void;
  renderRightIcon?: IconProps;
  topLabel?: string;
  placeholderTextColor?: string;
  viewStyle: ViewStyle;
  errorMessage?: string;
  inputStyle: ViewStyle;
  language?: 'english' | 'hindi';
  rules?: any;
}

const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  max,
  min,
  name,
  control,
  pattern,
  editable,
  required,
  maxLength,
  multiline,
  placeholder,
  removeRegex,
  keyboardType,
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
  language,
  rules,
}) => {
  return (
    <View style={viewStyle}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: required ?? false,
          min,
          max,
          minLength: ruleMinLength,
          maxLength: ruleMaxLength,
          pattern,
          ...rules,
        }}
        render={({
          field: {onChange, onBlur, value},
          fieldState: {error: fieldError},
        }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={inputOnPress}
            style={viewStyle}>
            {/* Removed pointerEvents="none" to allow icon press */}
            <InputComponent
              inputStyle={inputStyle}
              onblur={onBlur}
              topLabel={topLabel}
              iconName={iconName}
              iconOnpress={(e: any) => {
                e?.stopPropagation?.(); // optional safety
                if (iconOnpress) iconOnpress();
              }}
              viewStyle={viewStyle}
              editable={false}
              placeholderTextColor={placeholderTextColor}
              multiline={multiline}
              renderLeftIcon={renderLeftIcon}
              iconContainerStyle={iconContainerStyle}
              leftIconContainerStyle={leftIconContainerStyle}
              maxLength={maxLength}
              onChangeText={() => {}}
              secureTextEntry={secureTextEntry}
              leftIconName={leftIconName}
              errorMessage={
                fieldError?.message ||
                (error ? 'This field is required' : undefined)
              }
              placeholder={placeholder}
              keyboardType={keyboardType}
              numberOfLines={numberOfLines}
              autoCapitalize={autoCapitalize}
              containerStyle={containerStyle}
              inputContainerStyle={{
                borderColor:
                  error || fieldError ? COLORS.red : COLORS.primary,
                borderWidth: error || fieldError ? 1 : 0,
                borderBottomWidth: error || fieldError ? 1 : 0,
                ...inputContainerStyle,
              }}
              value={
                value?.path
                  ? value?.path?.split('/')?.pop()
                  : value?.name
                  ? value?.name
                  : value
              }
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImagePickerInput;
