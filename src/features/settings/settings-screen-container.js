import { compose } from '@reduxjs/toolkit';
import { useState } from 'react';
import { connect } from 'react-redux';

import { withHeader } from '../navigation/with-header';
import {
  decrementDayEndTime,
  decrementDayStartTime,
  incrementDayEndTime,
  incrementDayStartTime,
  remindersPerDayPicked,
  selectAllDaysAreCurrentlyActive,
  selectCanDecrementDayEndTime,
  selectCanDecrementDayStartTime,
  selectCanIncrementDayEndTime,
  selectCanIncrementDayStartTime,
  selectDayEndTime,
  selectDayStartTime,
  selectFridayIsActive,
  selectMondayIsActive,
  selectRemindersPerDay,
  selectSaturdayIsActive,
  selectSundayIsActive,
  selectThursdayIsActive,
  selectTuesdayIsActive,
  selectWednesdayIsActive,
  toggleFridayIsActive,
  toggleMondayIsActive,
  toggleSaturdayIsActive,
  toggleSundayIsActive,
  toggleThursdayIsActive,
  toggleTuesdayIsActive,
  toggleWednesdayIsActive,
} from './settings-reducer';
import { SettingsScreenComponent } from './settings-screen-component';

function SettingsScreenContainer({ remindersPerDay, ...props }) {
  const [currentRemindersPerDay, setCurrentRemindersPerDay] =
    useState(remindersPerDay);

  return (
    <SettingsScreenComponent
      onSlidingValueChange={setCurrentRemindersPerDay}
      remindersPerDay={currentRemindersPerDay}
      {...props}
    />
  );
}

const mapStateToProps = state => ({
  canDecrementDayEndTime: selectCanDecrementDayEndTime(state),
  canDecrementDayStartTime: selectCanDecrementDayStartTime(state),
  canIncrementDayEndTime: selectCanIncrementDayEndTime(state),
  canIncrementDayStartTime: selectCanIncrementDayStartTime(state),
  dayEndTime: selectDayEndTime(state),
  dayStartTime: selectDayStartTime(state),
  mondayIsActive: selectMondayIsActive(state),
  tuesdayIsActive: selectTuesdayIsActive(state),
  wednesdayIsActive: selectWednesdayIsActive(state),
  thursdayIsActive: selectThursdayIsActive(state),
  fridayIsActive: selectFridayIsActive(state),
  saturdayIsActive: selectSaturdayIsActive(state),
  sundayIsActive: selectSundayIsActive(state),
  remindersPerDay: selectRemindersPerDay(state),
  allDaysAreActive: selectAllDaysAreCurrentlyActive(state),
});

const mapDispatchToProps = {
  onDayEndTimeDecrementPress: decrementDayEndTime,
  onDayEndTimeIncrementPress: incrementDayEndTime,
  onDayStartTimeDecrementPress: decrementDayStartTime,
  onDayStartTimeIncrementPress: incrementDayStartTime,
  onToggleMondayIsActive: toggleMondayIsActive,
  onToggleTuesdayIsActive: toggleTuesdayIsActive,
  onToggleWednesdayIsActive: toggleWednesdayIsActive,
  onToggleThursdayIsActive: toggleThursdayIsActive,
  onToggleFridayIsActive: toggleFridayIsActive,
  onToggleSaturdayIsActive: toggleSaturdayIsActive,
  onToggleSundayIsActive: toggleSundayIsActive,
  onSlidingComplete: remindersPerDayPicked,
};

export default compose(
  withHeader({ title: 'Settings' }),
  connect(mapStateToProps, mapDispatchToProps),
)(SettingsScreenContainer);
