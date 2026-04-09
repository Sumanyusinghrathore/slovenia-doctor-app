import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { genericStyles, COLORS, FONTS } from '../../../constants';
import Label from '../../../components/Label/Labels';
import { useNavigation } from '@react-navigation/native';
import CustomHeader from '../../../components/Header/CustomHeader';

const BLOGS = [
  {
    id: '1',
    title: 'Managing Home Visits Efficiently',
    description:
      'How doctors and compounders can coordinate assignments, follow-ups, and patient updates smoothly.',
    date: '7/18/2025',
    image:
      'https://res.cloudinary.com/dcc9mvpxh/image/upload/v1752821081/mypnchhzdb6gfponb3nr.png',
  },
  {
    id: '2',
    title: 'Building Better Patient Records',
    description:
      'A simple guide to keeping prescriptions, vitals, and visit history consistent across the team.',
    date: '11/14/2025',
    image:
      'https://res.cloudinary.com/dcc9mvpxh/image/upload/v1752821081/mypnchhzdb6gfponb3nr.png',
  },
  {
    id: '3',
    title: 'Care Team Communication Tips',
    description:
      'Practical ways for admins, doctors, and compounders to stay aligned during daily operations.',
    date: '11/20/2025',
    image:
      'https://res.cloudinary.com/dcc9mvpxh/image/upload/v1752821081/mypnchhzdb6gfponb3nr.png',
  },
];

const BlogCard = ({ item, onPress }: any) => {
  
  return (
    <TouchableOpacity style={styles.card} activeOpacity={1} onPress={onPress}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />

      <View style={styles.cardBody}>
        <Label size={14} numberOfLines={1} labelContent={item.title} mb={6} />
        <Label
          size={12}
          numberOfLines={3}
          labelContent={item.description}
          mb={8}
        />
        <Label
          size={11}
          labelContent={item.date}
          mb={4}
        />
        <Label
          size={14}
          color={COLORS.primary}
          labelContent="Read More"
          family={FONTS.AxiformaBold}
          mt={4}
        />
      </View>
    </TouchableOpacity>
  );
};

const Blog = () => {
  const navigation = useNavigation<any>();
  const renderItem = ({ item }: any) => (
    <BlogCard
      item={item}
      onPress={() => {
        navigation.navigate('BlogDetails', { blog: item });
      }}
    />
  );

  return (
    <SafeAreaView style={[genericStyles.container]}>
      {/* <CustomHeader title='Blog '/> */}
     <View style={styles.container}>
      <FlatList
        data={BLOGS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
     </View>
    </SafeAreaView>
  );
};

export default Blog;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginHorizontal: 4,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: 10,
  },
});
