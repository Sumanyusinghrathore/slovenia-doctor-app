import { Platform, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { COLORS, FONTS } from "./theme";

// Define dynamic styles outside of StyleSheet.create
type StyleValue = string | number | undefined;

// Restrict textAlign to valid values only
type TextAlignValue =
  | "auto"
  | "center"
  | "left"
  | "right"
  | "justify"
  | undefined;

type JustifyContentValue =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-evenly"
  | "space-around"
  | undefined;

type FontWeightValue =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | undefined;

// Define dynamic styles as functions that return either ViewStyle or TextStyle
const dynamicStyles = {
  flexGrow: (flexGrow: number | undefined): ViewStyle => ({
    flexGrow: flexGrow,
  }),
  fontFamily: (fontFamily: string): TextStyle => ({
    fontFamily,
  }),
  fontSize: (fontSize: number | undefined): TextStyle => ({
    fontSize, // Ensure fontSize is a number or undefined
  }),
  color: (color: string): TextStyle => ({
    color,
  }),
  bg: (backgroundColor: string): ViewStyle => ({
    backgroundColor,
  }),
  bc: (borderColor: string): ViewStyle => ({
    borderColor,
  }),
  bw: (borderWidth: number): ViewStyle => ({
    borderWidth,
  }),
  ph: (paddingHorizontal: number): ViewStyle => ({
    paddingHorizontal,
  }),
  height: (height: StyleValue) => ({
    height,
  }),
  width: (width: StyleValue) => ({
    width,
  }),
  top: (top: number): ViewStyle => ({ top }),
  darkTilet: (
    height: number | undefined,
    width: number | undefined
  ): ViewStyle => ({
    backgroundColor: "rgba(0,0,0,0.4)",
    height,
    width,
    position: "absolute",
  }),
  pr: (paddingRight: number): ViewStyle => ({
    paddingRight,
  }),
  pb: (paddingBottom: number): ViewStyle => ({
    paddingBottom,
  }),

  pt: (paddingTop: number): ViewStyle => ({
    paddingTop,
  }),
  pv: (paddingVertical: number): ViewStyle => ({
    paddingVertical,
  }),

  pl: (paddingLeft: number): ViewStyle => ({
    paddingLeft,
  }),
  mb: (marginBottom: number): ViewStyle => ({
    marginBottom,
  }),
  mt: (marginTop: number): ViewStyle => ({
    marginTop,
  }),
  ml: (marginLeft: number): ViewStyle => ({
    marginLeft,
  }),
  mr: (marginRight: number): ViewStyle => ({
    marginRight,
  }),
  mh: (marginHorizontal: number): ViewStyle => ({
    marginHorizontal,
  }),
  mv: (marginVertical: number): ViewStyle => ({
    marginVertical,
  }),
  m: (margin: number): ViewStyle => ({
    margin,
  }),
  jc: (justifyContent: JustifyContentValue) => ({
    justifyContent,
  }),
  ai: (alignItems: string) => ({
    alignItems,
  }),
  padding: (padding: StyleValue) => ({
    padding,
  }),
  textbold: (fontWeight: string) => ({
    fontWeight,
  }),
  bbw: (borderBottomWidth: StyleValue) => ({
    borderBottomWidth,
  }),
  borderRadius: (borderRadius: StyleValue) => ({
    borderRadius,
  }),
  right: (right: StyleValue) => ({
    right,
  }),
  left: (left: StyleValue) => ({
    left,
  }),
  bottom: (bottom: StyleValue) => ({
    bottom,
  }),
  // Add other dynamic style functions similarly
  customTitle: (
    fs: number | undefined,
    c: string | undefined,
    ff: string | undefined,
    ta: TextAlignValue, // Restrict to valid textAlign values
    mv: number | undefined,
    mh: number | undefined,
    lh: number | undefined,
    mt: number | undefined,
    mb: number | undefined,
    fw: FontWeightValue
  ): TextStyle => ({
    fontSize: fs ?? 14,
    color: c ?? COLORS.black3,
    fontFamily: ff ?? FONTS.AxiformaMedium,
    textAlign: ta ?? "left", // Default to 'left' if undefined
    marginVertical: mv ?? 0,
    marginHorizontal: mh ?? 0,
    lineHeight: lh,
    marginTop: mt,
    marginBottom: mb,
    fontWeight: fw ?? "normal",
  }),
};

// Static styles using StyleSheet.create
const genericStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
    gap: 30,
  },
  flexWithMidCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  titleStyle: {
    color: "white",
  },
  fill: {
    flex: 1,
  },
  fillGrow: {
    flexGrow: 1,
  },
  header: {
    marginTop: 0,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  rowWithCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowWithCenterAndSB: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowWithSB: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  row: {
    flexDirection: "row",
  },

  upperCase: {
    textTransform: "uppercase",
  },
  rowWithWrap: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
  rowWithWrapCenter: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
  },
  offerText: {
    fontSize: 10,
    textAlign: "center",
    textTransform: "uppercase",
  },
  textCenter: {
    textAlign: "center",
  },
  selfCenter: {
    alignSelf: "center",
  },
  selfStart: {
    alignSelf: "flex-start",
  },
  selfEnd: {
    alignSelf: "flex-end",
  },
  textDecorationLine: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.14,
    shadowRadius: 5,
    elevation: 5,
  },

  positionRelative: {
    position: "relative",
  },
  badgeStyle: {
    position: "absolute",
    top: -3,
    right: -3,
  },
  rowText: {
    fontSize: 12,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 6,
  },
  headerPadding: {
    marginTop: 5,
    paddingHorizontal: 16,
  },
  modalHeaderPadding: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  flexEnd: {
    alignItems: "flex-end",
  },
  flexWrap: {
    flex: 1,
    flexWrap: "wrap",
  },

  column: {
    flexDirection: "column",
  },
  midCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  title400: {
    fontSize: 14,
    color: COLORS.black2,
    fontFamily: FONTS.AxiformaRegular,
  },
  title500: {
    fontSize: 14,
    color: COLORS.black2,
    fontFamily: FONTS.AxiformaMedium,
  },
  title600: {
    fontSize: 14,
    color: COLORS.black2,
    fontFamily: FONTS.AxiformaSemiBold,
  },

  absolutePosition: {
    position: "absolute",
  },
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  textShadow: {
    textShadowColor: "#00000026", // Shadow color (black with transparency)
    textShadowOffset: { width: 3, height: 3 }, // Shadow position (x, y)
    textShadowRadius: 6, // Shadow blur radius
  },
});

export { genericStyles, dynamicStyles };
