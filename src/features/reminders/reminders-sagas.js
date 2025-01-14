import { pluck } from 'ramda';
import { all, call, debounce, select } from 'redux-saga/effects';
import * as Notifications from 'expo-notifications';

import {
  decrementDayEndTime,
  decrementDayStartTime,
  incrementDayEndTime,
  incrementDayStartTime,
  remindersPerDayPicked,
  toggleFridayIsActive,
  toggleMondayIsActive,
  toggleSaturdayIsActive,
  toggleSundayIsActive,
  toggleThursdayIsActive,
  toggleTuesdayIsActive,
  toggleWednesdayIsActive,
} from '../settings/settings-reducer';
import {
  reminderAdded,
  reminderDeleted,
  reminderEdited,
  selectReminderNotificationSchedule,
} from './reminders-reducer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function* handleScheduleReminders() {
  yield call(Notifications.cancelAllScheduledNotificationsAsync);
  const notificationSchedule = yield select(selectReminderNotificationSchedule);
  yield all(
    notificationSchedule.map(notification =>
      call(Notifications.scheduleNotificationAsync, notification),
    ),
  );
}
const actionsToTriggerScheduling = pluck('type', [
  incrementDayStartTime(),
  decrementDayStartTime(),
  incrementDayEndTime(),
  decrementDayEndTime(),
  toggleMondayIsActive(),
  toggleTuesdayIsActive(),
  toggleWednesdayIsActive(),
  toggleThursdayIsActive(),
  toggleFridayIsActive(),
  toggleSaturdayIsActive(),
  toggleSundayIsActive(),
  remindersPerDayPicked(),
  reminderAdded(),
  reminderEdited(),
  reminderDeleted(),
]);

export function* watchScheduleReminders() {
  yield debounce(3 * 1000, actionsToTriggerScheduling, handleScheduleReminders);
}
