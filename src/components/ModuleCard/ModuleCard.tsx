import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import type { SvgProps } from "react-native-svg";
import Label from "../Label/Labels";
import { FONTS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import renderToast from "../../helper/renderToast";

const { width } = Dimensions.get("window");

type ModuleCardItem = {
  icon: React.FC<SvgProps>;
  title: string;
  subtitle?: string;
  route?: string;
  params?: any;
};

type ModuleCardProps = {
  data?: ModuleCardItem[];
  horizontal?: boolean;
  onPress?: (item: ModuleCardItem) => void;
};

const CARD_SPACING = 20;
const CONTAINER_PADDING = 10;

const ModuleCard: React.FC<ModuleCardProps> = ({
  data = [],
  horizontal = false,
  onPress,
}) => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const isSingle = data.length === 1;

  // card width for grid layout
  const cardWidth = horizontal
    ? width * 0.5
    : isSingle
    ? width - CONTAINER_PADDING * 2
    : (width - CONTAINER_PADDING * 2 - CARD_SPACING) / 2;

  const handlePress = (item: ModuleCardItem) => {
    if (onPress) onPress(item);
    else if (item.route) navigation.navigate(item.route, item.params || {});
    else renderToast(toast, "Coming soon!", "info");
  };

  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      numColumns={horizontal ? 1 : 2}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={!horizontal ? styles.rowSpacing : undefined}
      ItemSeparatorComponent={() =>
        horizontal ? <View style={{ width: CARD_SPACING }} /> : null
      }
      renderItem={({ item }) => {
        const Icon = item.icon;
        return (
          <TouchableOpacity
            style={[styles.card, { width: cardWidth }]}
            activeOpacity={0.9}
            onPress={() => handlePress(item)}
          >
            <View style={styles.iconBox}>
              <Icon width={40} height={40} />
            </View>
            <View style={styles.textContainer}>
              <Label
                family={FONTS.AxiformaRegular}
                size={15}
                labelContent={item.title}
              />
              {item.subtitle && (
                <Label
                  family={FONTS.AxiformaRegular}
                  size={14}
                  labelContent={item.subtitle}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ModuleCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingVertical: CONTAINER_PADDING,
  },
  rowSpacing: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    elevation: 1,
  },
  iconBox: {
    alignItems: "flex-start",
    marginBottom: 8,
  },
  textContainer: {
    marginTop: 4,
  },
});
