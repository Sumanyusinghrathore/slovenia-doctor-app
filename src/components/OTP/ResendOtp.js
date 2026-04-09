import {LayoutAnimation, Platform, Text, UIManager, View} from 'react-native';
import React, {useState} from 'react';
import Label from '../../components/Label/Labels';
import {COLORS, FONTS, genericStyles} from '../../constants';
import {dynamicStyles} from '../../constants/genericStyles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ResendOtp = ({onResendSendOTP}) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [targetTime, setTargetTime] = useState(null);
  const [activeResend, setActiveResend] = useState(true);
  let resendTimerInterval;

  const calculatetimerLeft = finalTime => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(null);
      clearInterval(resendTimerInterval);
      setActiveResend(true);
    }
  };

  const triggerTimer = (targetTimeSeconds = 60) => {
    setTargetTime(targetTimeSeconds);
    setActiveResend(false);
    const finalTime = +new Date() + targetTimeSeconds * 1000;
    resendTimerInterval = setInterval(
      () => (calculatetimerLeft(finalTime), 1000),
    );
  };

  const onSendOTP = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    if (onResendSendOTP) {
      onResendSendOTP();
    }
    triggerTimer();
  };

  return (
    <View style={genericStyles.midCenter}>
      {!activeResend && (
        <Label
          mb={20}
          family={FONTS.AxiformaRegular400}
          labelContent={`00:${timeLeft || targetTime}`}
        />
      )}

      <Text allowFontScaling={false} style={genericStyles.title500}>
        I didn’t receive the code!{' '}
        <Text
          allowFontScaling={false}
          disabled={!activeResend}
          onPress={() => onSendOTP()}
          style={[genericStyles.title600, dynamicStyles.color(COLORS.primary)]}>
          Resend{' '}
        </Text>
      </Text>
    </View>
  );
};

export default ResendOtp;
