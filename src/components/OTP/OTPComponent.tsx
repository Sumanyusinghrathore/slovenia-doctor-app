import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  Dimensions,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput as RNTextInput,
} from "react-native";
import { COLORS, FONTS } from "../../constants";

type Props = {
  updateOtp: (otp: string) => void;
  roundedTextInput?: any;
  containerStyle?: any;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BOX_SIZE = SCREEN_WIDTH < 360 ? 50 : SCREEN_WIDTH < 400 ? 60 : 80;

const OTPComponent: React.FC<Props> = ({
  updateOtp,
  containerStyle,
  roundedTextInput,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(RNTextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // ✅ Only allow single numeric character
    if (/^[0-9]?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      updateOtp(newOtp.join(""));

      // ✅ Move to next box if user enters a digit
      if (text && index < otp.length - 1) {
        inputs.current[index + 1]?.focus();
      }

      // ✅ Close keyboard if last box filled
      if (index === otp.length - 1 && text) {
        Keyboard.dismiss();
      }

      // ✅ If user deletes a digit, move back one box
      if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {otp.map((digit, index) => (
        <RNTextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[
            styles.roundedTextInput,
            roundedTextInput,
            { borderColor: "#000" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
          placeholder=""
          selectionColor={COLORS.primary}
        />
      ))}
    </View>
  );
};

export default OTPComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: "center",
    flexDirection: "row",
  },
  roundedTextInput: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: FONTS.AxiformaMedium,
    fontSize: 20,
    color: COLORS.primary,
    marginHorizontal: 5,
  },
});
