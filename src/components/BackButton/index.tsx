import React, {memo} from 'react';
import BackArrow from '../../assets/svg/arrow_back.svg';
import TouchableComponent from '../Routine/TouchableComponent';

const BackButton = memo(({onPress}) => (
  <TouchableComponent onPress={onPress}>
    <BackArrow width={30} height={30} />
  </TouchableComponent>
));

export default BackButton;
