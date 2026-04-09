import React, { useState, useMemo } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TextInput,
} from "react-native";
import { COLORS, FONTS } from "../../constants";
import Label from "../Label/Labels";
import Dropdowndownarrow from "../../assets/svg/Dropdown_downarrow.svg";

interface CustomDropdownProps {
  placeholder?: string;
  value?: any;
  data: { id: string | number; name: string }[];
  onChange?: (item: any) => void;
  topLabel?: string;
  container?: object;
  disable?: boolean;
  error?: boolean;
  dropDownStyle?: object;
  placeholderStyle?: object;
  required?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  placeholder = "Select",
  value,
  data,
  onChange,
  topLabel,
  container,
  disable = false,
  error = false,
  dropDownStyle,
  placeholderStyle,
  required = false,
}) => {
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const selectedLabel =
    data?.find((item) => item.id === value)?.name ?? placeholder;

  const handleSelect = (item: any) => {
    setVisible(false);
    setSearchText(""); // clear search when closing
    onChange?.(item);
  };

  // Filter list based on search input
  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, data]);

  return (
    <View style={container}>
      {/* --- Top Label --- */}
      {topLabel && (
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Label
            labelContent={topLabel}
            size={14}
            color={COLORS.white}
            mb={10}
            family={FONTS.AxiformaRegular}
            fw="500"
          />
          {required && (
            <Label labelContent="*" color="red" size={13} mh={2} />
          )}
        </View>
      )}

      {/* --- Dropdown Trigger --- */}
      <TouchableOpacity
        style={[
          styles.drop,
          {
            ...dropDownStyle,
            opacity: disable ? 1 : 1,
            borderWidth: error ? 1 : 0,
            borderColor: error ? COLORS.red : COLORS.transparent,
          },
        ]}
        activeOpacity={1}
        disabled={disable}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            styles.placeholderStyle,
            value ? styles.selectedText : { color: COLORS.third },
            placeholderStyle,
          ]}
          numberOfLines={1}
        >
          {selectedLabel}
        </Text>
        <Dropdowndownarrow
          width={18}
          height={18}
          style={{ marginRight: 15 }}
          color={COLORS.primary}
        />
      </TouchableOpacity>

      {/* --- Modal Dropdown List --- */}
      <Modal visible={visible} transparent animationType="fade">
  <TouchableWithoutFeedback onPress={() => setVisible(false)}>
    <View style={styles.modalOverlay} />
  </TouchableWithoutFeedback>

  <View style={styles.centerWrapper}>
    <View style={styles.modalBox}>
      {/* --- Search Box --- */}
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search..."
        placeholderTextColor={COLORS.third}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.option}
            activeOpacity={1}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                value === item.id && {
                  color: COLORS.primary,
                  fontWeight: "600",
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found</Text>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  </View>
</Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  drop: {
    borderRadius: 15,
    minHeight: 55,
    backgroundColor: COLORS.primary2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.third,
    fontFamily: FONTS.AxiformaRegular,
  },
  selectedText: {
    color: COLORS.textColor,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  centerWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center", // center when small
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    width: "100%",
    maxHeight: "80%", // ⬅ expand until 80% of screen height if list is long
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 8,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: COLORS.primary2,
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: COLORS.textColor,
    fontFamily: FONTS.AxiformaRegular,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textColor,
    fontFamily: FONTS.AxiformaRegular,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.primary2,
    marginHorizontal: 10,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.third,
    marginTop: 10,
  },
});
