import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {genericStyles, SIZES} from '../../constants';
import RowLabel from '../Label/RowLabel';

const HorizontalComponent = ({
  type,
  data,
  Cards,
  userData,
  onMeeting,
  firstLabel,
  refetchAll,
  onSeeMore,
  ButtonTitle,
  topButtonColor,
  containerStyle,
  onUnderApproval,
  setMeetingModal,
  secondLabel,
  meetingInvitees,
  show,
  cardStyle,
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollViewRef = React.useRef(null);

  const size = type === 'Mentor' ? 0.5 : 0.6;

  const onScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SIZES.width / size);
    setActiveIndex(index);
  };

  if (!data || data?.length === 0) {
    return false;
  }

  return (
    <View style={containerStyle}>
      <RowLabel
        firstLabelSize={18}
        onSecondTouch={onSeeMore}
        viewStye={styles.rowContainer}
        rowLabel={` (${data?.length})`}
        secondLabel={secondLabel ?? 'See More'}
        firstLabel={firstLabel ?? `Session Request`}
      />
      <ScrollView
        horizontal
        onScroll={onScroll}
        ref={scrollViewRef}
        scrollEventThrottle={16}
        // pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={genericStyles.ph(10)}>
        {data?.map((item, index) => {
          return (
            <View key={index} style={{...genericStyles.mt(5)}}>
              {type === 'Mentor' ? (
                <Cards
                  cardStyle={{...genericStyles.width('95%'), ...cardStyle}}
                />
              ) : (
                <Cards
                  data={item}
                  userData={userData}
                  onMeeting={onMeeting}
                  refetchAll={refetchAll}
                  ButtonTitle={ButtonTitle}
                  setMeetingModal={setMeetingModal}
                  topButtonColor={topButtonColor}
                  onUnderApproval={onUnderApproval}
                  meetingInvitees={meetingInvitees}
                  cardStyle={{...genericStyles.width('95%'), ...cardStyle}}
                  isSchedule={firstLabel?.includes('Schedule')}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
      {!show && (
        <View style={styles.dotContainer}>
          {data?.map((_, index) => (
            <View key={index} style={styles.dot(activeIndex, index)} />
          ))}
        </View>
      )}
    </View>
  );
};

export default HorizontalComponent;

const styles = StyleSheet.create({
  dot: (activeIndex, index) => ({
    height: 10,
    width: activeIndex === index ? 30 : 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: activeIndex === index ? '#3A81E1' : '#C4C4C4',
  }),

  dotContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  rowContainer: {
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
});
