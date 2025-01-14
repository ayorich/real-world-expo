import { Button, Slider, Text } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { darkColors } from '../../styles/colors';
import { settingsConstants } from './settings-constants';
import { TimePickerComponent } from './time-picker-component';

const noop = () => {};

function WeekdayButton({ isActive, ...props }) {
  return (
    <Button
      buttonStyle={isActive ? styles.weekdayButton : styles.secondaryButton}
      size="sm"
      titleStyle={styles.weekdayButtonTitle}
      {...props}
    />
  );
}

function Heading({ children }) {
  return (
    <View style={styles.headingContainer}>
      <Text h4 h4Style={styles.h4Style} style={styles.heading}>
        {children}
      </Text>
    </View>
  );
}

export function SettingsScreenComponent({
  allDaysAreActive = false,
  canDecrementDayEndTime = true,
  canDecrementDayStartTime = true,
  canIncrementDayEndTime = true,
  canIncrementDayStartTime = true,
  dayEndTime = '22:00',
  dayStartTime = '08:00',
  onDayEndTimeDecrementPress = noop,
  onDayEndTimeIncrementPress = noop,
  onDayStartTimeDecrementPress = noop,
  onDayStartTimeIncrementPress = noop,
  mondayIsActive = false,
  tuesdayIsActive = false,
  wednesdayIsActive = false,
  thursdayIsActive = false,
  fridayIsActive = false,
  saturdayIsActive = false,
  sundayIsActive = false,
  onSlidingComplete = noop,
  onSlidingValueChange = noop,
  onToggleMondayIsActive = noop,
  onToggleTuesdayIsActive = noop,
  onToggleWednesdayIsActive = noop,
  onToggleThursdayIsActive = noop,
  onToggleFridayIsActive = noop,
  onToggleSaturdayIsActive = noop,
  onToggleSundayIsActive = noop,
  remindersPerDay = 1,
}) {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        <SafeAreaView style={styles.safeArea}>
          <Heading>When should reminders be sent?</Heading>

          <View style={styles.timePickerContainer}>
            <TimePickerComponent
              currentTime={dayStartTime}
              decreaseLabel="decrease day start time by one hour"
              decrementButtonEnabled={canDecrementDayStartTime}
              increaseLabel="increase day start time by one hour"
              incrementButtonEnabled={canIncrementDayStartTime}
              onDecrementPress={onDayStartTimeDecrementPress}
              onIncrementPress={onDayStartTimeIncrementPress}
              title="Starting at:"
            />

            <TimePickerComponent
              currentTime={dayEndTime}
              decreaseLabel="decrease day end time by one hour"
              decrementButtonEnabled={canDecrementDayEndTime}
              increaseLabel="increase day end time by one hour"
              incrementButtonEnabled={canIncrementDayEndTime}
              onDecrementPress={onDayEndTimeDecrementPress}
              onIncrementPress={onDayEndTimeIncrementPress}
              title="Ending at:"
            />

            <Text style={styles.miniInfo}>
              Timezone is local to your current location.
            </Text>
          </View>

          <Heading>Which days should reminders be sent?</Heading>

          <View style={styles.weekdayButtonContainer}>
            <WeekdayButton
              onPress={onToggleMondayIsActive}
              title="Mon"
              isActive={mondayIsActive}
            />

            <WeekdayButton
              onPress={onToggleTuesdayIsActive}
              title="Tue"
              isActive={tuesdayIsActive}
            />

            <WeekdayButton
              onPress={onToggleWednesdayIsActive}
              title="Wed"
              isActive={wednesdayIsActive}
            />

            <WeekdayButton
              onPress={onToggleThursdayIsActive}
              title="Thu"
              isActive={thursdayIsActive}
            />

            <WeekdayButton
              onPress={onToggleFridayIsActive}
              title="Fri"
              isActive={fridayIsActive}
            />

            <WeekdayButton
              onPress={onToggleSaturdayIsActive}
              title="Sat"
              isActive={saturdayIsActive}
            />

            <WeekdayButton
              onPress={onToggleSundayIsActive}
              title="Sun"
              isActive={sundayIsActive}
            />
          </View>

          <View style={styles.sliderContainer}>
            {allDaysAreActive && (
              <Text style={styles.miniInfo}>
                All days are currently active.
              </Text>
            )}

            <Text style={{ fontSize: 20 }}>
              Reminders per day: {remindersPerDay}
            </Text>

            <Slider
              maximumValue={settingsConstants.MAX_REMINDERS_PER_DAY}
              minimumValue={settingsConstants.MIN_REMINDERS_PER_DAY}
              onSlidingComplete={onSlidingComplete}
              onValueChange={onSlidingValueChange}
              step={settingsConstants.REMINDERS_PER_DAY_STEP}
              value={remindersPerDay}
            />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkColors.backgroundColorSecondary,
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headingContainer: {
    backgroundColor: darkColors.backgroundColorTertiary,
    borderBottomColor: darkColors.borderColor,
    borderBottomWidth: 1,
    borderTopColor: darkColors.borderColor,
    borderTopWidth: 1,
    marginHorizontal: -16,
  },
  heading: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  h4Style: {
    fontSize: 20,
  },
  timePickerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 20,
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 20,
    width: '100%',
  },
  weekdayButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 20,
  },
  weekdayButtonTitle: {
    fontSize: 12,
    width: 32,
    textTransform: 'uppercase',
  },
  weekdayButton: {
    borderColor: darkColors.backgroundColorPrimary,
    borderRadius: 8,
    borderWidth: 1,
  },
  secondaryButton: {
    backgroundColor: darkColors.secondary,
    borderColor: darkColors.borderColor,
    borderWidth: 1,
    borderRadius: 8,
  },
  miniInfo: {
    textAlign: 'right',
    fontSize: 12,
  },
});
