import React from "react";
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { Button, ButtonProps } from "@rneui/themed";
import { COLORS, FONTS } from "../../constants";

interface AppButtonProps {
  disabledTitleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  disabledStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
  btnType?: ButtonProps["type"];
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  title?: string | any;
  loadingProps?: any;
  children?: React.ReactNode;
  borderRadius?: number;
}

const AppButton: React.FC<AppButtonProps> = ({
  disabledTitleStyle,
  containerStyle,
  disabledStyle,
  buttonStyle,
  titleStyle,
  disabled = false,
  btnType,
  onPress = () => {},
  loading = false,
  title,
  loadingProps,
  children,
  borderRadius,
}) => {
  const mergedButtonStyle: ViewStyle = {
    borderRadius: borderRadius ?? 30,
    height: buttonStyle?.height ?? 50,
    backgroundColor: buttonStyle?.backgroundColor ?? COLORS.primary,
    ...(buttonStyle || {}),
  };

  return (
    <Button
      title={title}
      type={btnType}
      loading={loading}
      onPress={onPress}
      children={children}
      disabled={disabled}
      buttonStyle={mergedButtonStyle}
      loadingProps={loadingProps}
      disabledStyle={disabledStyle}
      containerStyle={containerStyle}
      disabledTitleStyle={disabledTitleStyle}
      titleStyle={[
        styles.titleStyle,
        titleStyle,
        { fontFamily: FONTS.AxiformaBold },
      ]}
    />
  );
};

export default AppButton;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 16,
    color: COLORS.white,
  },
});
