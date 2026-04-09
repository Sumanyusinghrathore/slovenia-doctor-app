import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import AppButton from './AppButton';
import {COLORS, genericStyles} from '../../constants';
import {ButtonProps} from '@rneui/base';
import {dynamicStyles} from '../../constants/genericStyles';

// Define the prop types for RowButton
interface RowButtonProps {
  title: string;
  title2: string;
  btnType: ButtonProps['type'];
  onPress1: () => void;
  onPress2: () => void;
  loading: boolean;
  loading2: boolean;
  changeColor?: string;
  containerStyle?: ViewStyle;
  containerStyle1?: ViewStyle;
}

const RowButton: React.FC<RowButtonProps> = ({
  title,
  title2,
  onPress1,
  btnType,
  onPress2,
  loading,
  loading2,
  changeColor = 'GREEN',
  containerStyle,
  containerStyle1,
}) => {
  return (
    <View style={genericStyles.row}>
      <AppButton
        title={title}
        loading={loading}
        onPress={onPress1}
        changeColor={changeColor}
        containerStyle={{flex: 1, ...containerStyle}}
        buttonStyle={{
          paddingVertical: 12,
          backgroundColor: COLORS.black,
        }}
      />
      <AppButton
        title={title2}
        loading={loading2}
        btnType={btnType}
        changeColor={changeColor}
        buttonStyle={styles.buttonStyle}
        titleStyle={dynamicStyles.color(COLORS.black)}
        onPress={onPress2}
        containerStyle={{
          flex: 0.8,
          marginLeft: 10,
          ...containerStyle1,
        }}
      />
    </View>
  );
};

export default RowButton;

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 2,
    paddingVertical: 10,
    borderColor: COLORS.black,
  },
});
