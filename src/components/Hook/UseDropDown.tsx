import React from 'react';
import { Controller } from 'react-hook-form';
import { COLORS } from '../../constants';
import { TextStyle, ViewStyle } from 'react-native';
import CustomDropdown from '../DropDown/DropDown';

interface DropDownProps {
  name: string;
  data?: any[];
  control?: any;
  disabled?: boolean;
  required?: boolean;
  changeId?: boolean;
  labelField?: string;
  valueField?: string;
  placeholder?: string;
  onChange?: (value: any) => void; // optional callback
  dropDownStyle?: ViewStyle;
  defaultValue?: any;
  topLabel?: string;
  container?: ViewStyle;
  placeholderStyle?: TextStyle;
}

const UseDropDown: React.FC<DropDownProps> = ({
  name,
  data = [],
  control,
  disabled,
  required,
  changeId = false,
  labelField = 'name',
  valueField = 'id',
  placeholder,
  onChange: externalOnChange,
  dropDownStyle,
  defaultValue = null,
  topLabel,
  container,
  placeholderStyle,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required ? 'Required' : false,
      }}
      render={({ field: { onChange, value }, fieldState, formState }) => {
        const showError = formState.isSubmitted && !!fieldState.error;

        return (
          <CustomDropdown
            topLabel={topLabel}
            required={required}
            data={data}
            container={container}
            disable={disabled}
            value={value ? value[valueField] : null} // ✅ IMPORTANT FIX
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            placeholderStyle={placeholderStyle}
            dropDownStyle={{
              borderWidth: 1.5,
              borderColor: showError ? COLORS.red : COLORS.lightBlack,
              ...dropDownStyle,
            }}
            onChange={(selected: any) => {
              onChange(selected); // full object
              if (externalOnChange) {
                externalOnChange(selected);
              }
            }}
          />

        );
      }}
    />
  );
};

export default UseDropDown;
