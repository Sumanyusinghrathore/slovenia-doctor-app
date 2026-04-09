import React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  FlatListProps,
  ListRenderItemInfo,
  ViewabilityConfig,
} from 'react-native';
import {COLORS} from '../../constants';

type FlatListComponentProps<ItemT> = {
  data: ItemT[];
  style?: object;
  onRefresh?: () => void;
  refreshing?: boolean;
  horizontal?: boolean;
  renderItem: (info: ListRenderItemInfo<ItemT>) => React.ReactNode;
  handleOnEndReached?: () => void;
  ListHeaderComponent?: React.ReactNode;
  ListFooterComponent?: React.ReactNode;
  contentContainerStyle?: object;
  ListFooterComponentStyle?: object;
  ItemSeparatorComponent?: React.ReactNode;
  ListEmptyComponent?: React.ReactNode;
  onEndReachedThreshold?: number;
  onScrollBeginDrag?: () => void;
  viewabilityConfig?: ViewabilityConfig;
  onViewableItemsChanged?: (info: {
    viewableItems: any[];
    changed: any[];
  }) => void;
  numColumns?: any
};

const FlatListComponent = <ItemT extends {}>({
  data,
  style,
  onRefresh,
  refreshing,
  horizontal,
  renderItem,
  handleOnEndReached,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  ListFooterComponentStyle,
  ItemSeparatorComponent,
  ListEmptyComponent,
  onEndReachedThreshold,
  onScrollBeginDrag,
  viewabilityConfig,
  onViewableItemsChanged,
  numColumns,
}: FlatListComponentProps<ItemT>) => {
  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      ListEmptyComponent={ListEmptyComponent}
      style={style}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      initialNumToRender={6}
      renderItem={renderItem}
      refreshControl={
        onRefresh && (
          <RefreshControl
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            refreshing={refreshing ?? false}
          />
        )
      }
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      onEndReachedThreshold={onEndReachedThreshold}
      onScrollBeginDrag={onScrollBeginDrag}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={handleOnEndReached}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={contentContainerStyle}
      ListFooterComponentStyle={ListFooterComponentStyle}
      ListFooterComponent={ListFooterComponent ?? <View />}
    />
  );
};

export default FlatListComponent;
