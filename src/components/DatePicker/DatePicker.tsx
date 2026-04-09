import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
type DatePickerProps = {
  date?: Date;
  onShow?: boolean;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
  mode?: 'time' | 'date' | 'datetime' | undefined;
  display?: any;
  is24Hour?: boolean;
  disabled?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
};
const DatePicker: React.FC<DatePickerProps> = ({
  mode,
  onShow,
  display,
  is24Hour,
  disabled,
  onCancel,
  onConfirm,
  minimumDate,
  maximumDate,
  date,
}) => {
  // const dateFrom = moment().subtract(7, 'd');

  // var date = new Date();
  // date.setDate(date.getDate() - 30);
  // var dateString = date.toISOString().split('T')[0];
  return (
    <DateTimePickerModal
      mode={mode}
      isVisible={onShow}
      display={display}
      date={date ?? new Date()}
      disabled={disabled}
      is24Hour={is24Hour}
      onConfirm={onConfirm ?? (() => {})}
      maximumDate={maximumDate}
      onCancel={onCancel ?? (() => {})}
      minimumDate={minimumDate}
    />
  );
};

export default DatePicker;
