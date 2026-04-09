import React from 'react';
import CustomActionSheet from '../ActionSheet/CustomActionSheet';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {dynamicStyles} from '../../constants/genericStyles';
import AppButton from '../CustomButton/AppButton';
import UseDropDown from '../../components/Hook/UseDropDown';
import UseInput from '../../components/Hook/UseInput';
import {useTranslation} from 'react-i18next';

interface FilterField {
  type: 'dropdown' | 'input';
  name: string;
  label: string;
  data?: any[]; // Only for dropdowns
  placeholder: string;
  required?: boolean;
  keyboardType?: string; // Only for input fields
  autoCapitalize?: string; // Only for input fields
}

interface FilterModalProps {
  actionSheetRef: any;
  onPress: () => void;
  closeOnPressBack?: () => void;
  control: any;
  errors: any;
  watch: any;
  reset: any;
  onClear: () => void;
  fields: FilterField[]; // Dynamic field configuration
  containerStyle?: ViewStyle;
}

const FilterModal: React.FC<FilterModalProps> = ({
  actionSheetRef,
  onPress,
  closeOnPressBack,
  control,
  errors,
  watch,
  reset,
  onClear,
  fields,
  containerStyle,
}) => {
  const {t, i18n} = useTranslation();

  return (
    <CustomActionSheet
      containerStyle={containerStyle}
      actionSheetRef={actionSheetRef}
      keyboardHandlerEnabled={false}>
      <View>
        <ScrollView
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled">
          <View style={dynamicStyles.padding(20) as any}>
            {fields.map((field, index) =>
              field.type === 'dropdown' ? (
                <UseDropDown
                  key={index}
                  topLabel={field.label}
                  control={control}
                  name={field.name}
                  data={field.data || []}
                  required={field.required || false}
                  placeholder={field.placeholder}
                  container={dynamicStyles.mb(18)}
                  labelField={
                    i18n.language === 'hi' && field.data?.[0]?.hindi_name
                      ? 'hindi_name'
                      : 'name'
                  }
                  valueField="id"
                  error={errors?.[field.name]}
                />
              ) : (
                <UseInput
                  key={index}
                  topLabel={field.label}
                  viewStyle={dynamicStyles.mb(10)}
                  control={control}
                  name={field.name}
                  placeholder={field.placeholder}
                  error={errors?.[field.name]}
                  required={field.required || false}
                  keyboardType={field.keyboardType || 'default'}
                  autoCapitalize={field.autoCapitalize || ('none' as any)}
                />
              ),
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <AppButton
            title={t('Clear')}
            onPress={onClear}
            buttonStyle={styles.buttonApply}
          />
          <AppButton
            title={t('Apply')}
            onPress={onPress}
            buttonStyle={styles.buttonApply}
          />
        </View>
      </View>
    </CustomActionSheet>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonApply: {
    width: 150,
    paddingVertical: 15,
  },
});
