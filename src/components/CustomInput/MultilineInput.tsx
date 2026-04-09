import React from 'react';
import {
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  View,
  TextInput,
} from 'react-native';
import {Input, IconProps} from '@rneui/themed';
import {FONTS, COLORS} from '../../constants';
import {dynamicStyles} from '../../constants/genericStyles';
import Label from '../Label/Labels';

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
  renderLeftIcon?: React.ReactNode;
  renderRightIcon?: React.ReactNode;
  inputOnPress?: () => void;
  ref?: React.Ref<typeof Input>;
  topLabel?: string;
  viewStyle?: ViewStyle;
}

const MultilineInput: React.FC<InputComponentProps> = ({
  placeholder,
  errorStyle,
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
  onblur,
  errorMessage,
  iconContainerStyle,
  onChange,
  editable,
  placeholderTextColor,
  cursorColor,
  onPressIn,
  leftIconContainerStyle,
  renderLeftIcon,
  renderRightIcon,
  inputOnPress,
  topLabel,
  viewStyle,
}) => {
  return (
    <View style={{...viewStyle}}>
      
      <View style={{ flexDirection: 'row'}}>
      {topLabel && <Label labelContent={topLabel} size={14} mb={7} />}
            <Label labelContent='*'color='red' size={13}  mh={2}></Label>
            </View>

      <View style={dynamicStyles.ph(0)}>
        {renderLeftIcon && (
          <View style={leftIconContainerStyle}>{renderLeftIcon}</View>
        )}
        <TextInput
          placeholder={placeholder ?? ''}
          editable={editable}
          onPressIn={onPressIn}
          cursorColor={cursorColor}
          placeholderTextColor={placeholderTextColor ?? COLORS.black}
          style={styles.inputStyle}
          onChange={onChange}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize ? autoCapitalize : 'words'}
          multiline={multiline}
          onPress={inputOnPress}
          onKeyPress={onKeyPress}
          autoFocus={autoFocus}
          numberOfLines={numberOfLines}
          onBlur={onblur}
        />
        {renderRightIcon && (
          <View style={iconContainerStyle}>{renderRightIcon}</View>
        )}

        {errorMessage && (
          <Label
            labelContent={errorMessage}
            style={{...errorStyle, color: COLORS.red, marginTop: 10}}
          />
        )}
      </View>
    </View>
  );
};

export default MultilineInput;

const styles = StyleSheet.create({
  inputStyle: {
    height: 100,
    backgroundColor: COLORS.primary3,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 15,
    marginTop: 10,
    fontFamily: FONTS.AxiformaMedium500,
    color: COLORS.textGray,
    textAlignVertical: 'top',
  },
});
