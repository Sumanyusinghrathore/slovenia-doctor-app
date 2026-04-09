import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { COLORS, FONTS } from "../../constants";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: (startDate: string, endDate: string) => void;

  // 🗓️ Configurable Props
  minDate?: Date;
  maxDate?: Date;
  initialStartDate?: Date;
  initialEndDate?: Date;
  startFromMonday?: boolean;
  showToday?: boolean;
  todayTextColor?: string;
  allowRangeSelection?: boolean;
  title?: string;
};

const MultiDatePicker: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  onCancel,
  minDate,
  maxDate,
  initialStartDate,
  initialEndDate,
  startFromMonday = true,
  showToday = true,
  todayTextColor = COLORS.primary2,
  allowRangeSelection = true,
  title = "Select Date Range",
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<any>(initialStartDate || null);
  const [selectedEndDate, setSelectedEndDate] = useState<any>(initialEndDate || null);

  // Reset dates when modal opens
  useEffect(() => {
  if (visible) {
    if (initialStartDate && initialEndDate) {
      // If user has already selected custom dates — show them again
      setSelectedStartDate(initialStartDate);
      setSelectedEndDate(initialEndDate);
    } else {
      // Otherwise, highlight 1 → today for the current month
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setSelectedStartDate(firstDay);
      setSelectedEndDate(today);
    }
  }
}, [visible, initialStartDate, initialEndDate]);

  const handleConfirm = () => {
  if (selectedStartDate) {
    const format = (date: any) => {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, "0");
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    // ✅ If no end date selected, use start date for both
    const start = format(selectedStartDate);
    const end = selectedEndDate ? format(selectedEndDate) : start;

    onConfirm(start, end);
  }

  onClose();
};


  const handleCancel = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    onCancel();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
  <TouchableOpacity
    activeOpacity={1}
    onPress={onClose}
    style={styles.overlay}
  >
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Calendar */}
      <CalendarPicker
        startFromMonday={startFromMonday}
        allowRangeSelection={allowRangeSelection}
        minDate={minDate}
        maxDate={maxDate}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onDateChange={(date, type) => {
          if (type === "START_DATE") {
            setSelectedStartDate(date);
            setSelectedEndDate(null);
          } else {
            setSelectedEndDate(date);
          }
        }}
        todayBackgroundColor={showToday ? COLORS.primary2 : undefined}
        todayTextStyle={showToday ? { color: todayTextColor } : {}}
        selectedDayColor={COLORS.primary}
        selectedDayTextColor="#fff"
        width={width * 0.9}
      />

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleConfirm} style={styles.okButton}>
          <Text style={styles.okText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>

  );
};

export default MultiDatePicker;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "90%",
    elevation: 6,
  },
  title: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: FONTS.AxiformaBold,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: COLORS.primary2,
    marginRight: 10,
  },
  okButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  cancelText: {
    color: "#000",
    fontFamily: FONTS.AxiformaMedium,
  },
  okText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: FONTS.AxiformaBold,
  },
});
