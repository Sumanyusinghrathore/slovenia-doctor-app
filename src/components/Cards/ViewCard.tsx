import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Card } from "@rneui/themed";
import { FONTS, COLORS } from "../../constants";
import Label from "../Label/Labels";
import AppButton from "../CustomButton/AppButton";
import WhiteCard from "./WhiteCard";

interface DetailItem {
  label: string;
  value: string;
}

interface Partner {
  name: string;
  role: string;
  address: string;
}

interface ViewCardProps {
  title: string;
  details: DetailItem[];
  partners?: Partner[];
  EditIcon?: React.ComponentType<any>;
  DeleteIcon?: React.ComponentType<any>;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
  buttonText?: string;
}

const ViewCard: React.FC<ViewCardProps> = ({
  title,
  details,
  partners = [],
  onEdit,
  onDelete,
  EditIcon, // <-- include here
  DeleteIcon, // <-- include here
  onClose,
  buttonText,
}) => {
  return (
    <ScrollView>
      <Card containerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.iconRow}>
            {EditIcon && onEdit ? <EditIcon onPress={onEdit} /> : null}
            {DeleteIcon && onDelete ? <DeleteIcon onPress={onDelete} /> : null}
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          {details.map((item, index) => (
            <View key={index} style={styles.detailRow}>
              <Text style={styles.detailLabel}>{item.label} </Text>
              <Label
                textStyle={{ justifyContent: "center", alignItems: "center" }}
                labelContent={" :    "}
              />
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Partners Section */}
        {partners.length > 0 && (
          <View style={{ marginTop: 15 }}>
            <Text style={styles.partnerTitle}>Other Partners</Text>
            {partners.map((partner, index) => (
              <WhiteCard key={index} style={{ margin: 10 }}>
                <View style={{ padding: 10 }}>
                  <Text style={styles.partnerName}>
                    {partner.name} ({partner.role})
                  </Text>
                  <Text style={styles.partnerAddress}>{partner.address}</Text>
                </View>
              </WhiteCard>
            ))}
          </View>
        )}
        {/* Bottom Button */}
        {onClose && (
          <View style={{ padding: 15 }}>
            <AppButton title={buttonText} onPress={onClose} />
          </View>
        )}
      </Card>
    </ScrollView>
  );
};

export default ViewCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 0,
    margin: 10,
    elevation: 3,
    backgroundColor: "#F4F4F4",
    paddingBottom: 10,
  },
  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.white,
    fontSize: 16,
  },
  iconRow: {
    flexDirection: "row",
    gap: 12,
  },
  detailsContainer: {
    padding: 12,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  detailLabel: {
    flex: 1,
    color: "#7E869E",
    fontFamily: FONTS.AxiformaRegular,
  },
  detailValue: {
    flex: 2,
    color: COLORS.black,
    fontFamily: FONTS.AxiformaRegular,
    lineHeight: 20,
  },
  partnerTitle: {
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 12,
  },
  partnerCard: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 10,
  },
  partnerName: {
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
  },
  partnerAddress: {
    fontFamily: FONTS.AxiformaRegular,
    color: "#7E869E",
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
});
