import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import Label from "../Label/Labels";
import BackIcon from "../../assets/svg/arrowleft.svg";
import { COLORS, FONTS } from "../../constants";

/* ---------------- TYPES ---------------- */

type SvgIconProps = {
  width?: number;
  height?: number;
  fill?: string;
};

type VectorIconProps = {
  name: string;
  size?: number;
  color?: string;
};

type CustomHeaderProps = {
  title: string;
  backgroundColors?: string[];
  rightIcon?: React.FC<SvgIconProps>;
  rightVectorIcon?: VectorIconProps;
  onRight?: () => void;
  onpressBack?: () => void;
};

/* ---------------- COMPONENT ---------------- */

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  backgroundColors = [COLORS.white, COLORS.white],
  rightIcon: RightIcon,
  rightVectorIcon,
  onRight,
  onpressBack,
}) => {
  const navigation = useNavigation<any>();

  const handleBackPress = () => {
    if (onpressBack) {
      onpressBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <LinearGradient colors={backgroundColors} style={styles.container}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* LEFT */}
        {/* <View style={styles.side}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBackPress}
            style={styles.iconButton}
          >
            <BackIcon width={22} height={22} fill={COLORS.black} />
          </TouchableOpacity>
        </View> */}

        {/* CENTER */}
        <View style={styles.center}>
          <Label
            labelContent={title}
            size={18}
            family={FONTS.AxiformaBold}
            color={COLORS.black}
            textStyle={styles.title}
            numberOfLines={1}
          />
        </View>

        {/* RIGHT */}
        <View style={styles.side}>
          {RightIcon && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onRight}
              style={styles.iconButton}
            >
              <RightIcon width={20} height={20} fill={COLORS.black} />
            </TouchableOpacity>
          )}

          {rightVectorIcon && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onRight}
              style={styles.iconButton}
            >
              <Icon
                name={rightVectorIcon.name}
                size={rightVectorIcon.size ?? 22}
                color={rightVectorIcon.color ?? COLORS.black}
              />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CustomHeader;

/* ---------------- STYLES ---------------- */

const HEADER_HEIGHT = 56;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  safeArea: {
    height:
      HEADER_HEIGHT +
      (Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 0),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  side: {
    width: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    textAlign: "center",
  },

  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
