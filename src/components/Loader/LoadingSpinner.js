import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS, genericStyles} from '../../constants';
import Label from '../Label/Labels';

const LoadingSpinner = ({showModal, activityIndicatorColor}) => {
  return (
    <Modal
      isVisible={showModal}
      animationIn="fadeIn"
      useNativeDriverForBackdrop
      animationOut="fadeOut">
      <View
        style={[
          genericStyles.rowWithCenter,
          {backgroundColor: 'white', paddingVertical: 22},
        ]}>
        <ActivityIndicator
          style={genericStyles.mh(10)}
          color={activityIndicatorColor ?? COLORS.primary}
        />
        <Label labelContent={'Please wait...'} />
      </View>
    </Modal>
  );
};

export default LoadingSpinner;
