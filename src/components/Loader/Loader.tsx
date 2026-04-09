import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COLORS, genericStyles} from '../../constants';

interface LoaderProps {
  container?: object;
}

const Loader: React.FC<LoaderProps> = ({container}) => {
  return (
    <View style={[genericStyles.flexWithMidCenter, {...container}]}>
      <ActivityIndicator color={COLORS.primary} size="large" />
    </View>
  );
};

export default Loader;
