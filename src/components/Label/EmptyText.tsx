import {genericStyles} from '../../constants';
import Label from './Labels';
import RefreshScrollView from '../Scroll/RefreshScrollView';

interface EmptyTextProps {
  onRefresh: () => void;
  flex?: number;
  style?: object;
  title: string;
}

const EmptyText = ({onRefresh, flex, style, title}: EmptyTextProps) => {
  return (
    <RefreshScrollView
      onRefresh={onRefresh}
      contentContainerStyle={[
        genericStyles.midCenter,
        {flex: flex ?? 1},
        {...style},
      ]}>
      <Label labelContent={title} />
    </RefreshScrollView>
  );
};

export default EmptyText;
