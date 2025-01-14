import { testSaga } from 'redux-saga-test-plan';
import * as Notifications from 'expo-notifications';
import { call } from 'redux-saga/effects';
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
} from './reminders-reducer';
import {
  handleScheduleReminders,
  watchScheduleReminders,
} from './reminders-sagas';

describe('handleScheduleReminders saga', () => {
  it('logs a message to the console', () => {
    const mockNotificationSchedule = [
      {
        content: { title: 'Random Reminder App', body: 'You got this! 💪' },
        trigger: { repeats: true, weekday: 1, hour: 12, minute: 30 },
      },
      {
        content: {
          title: 'Random Reminder App',
          body: 'Learn Redux at a senior-level.',
        },
        trigger: { repeats: true, weekday: 2, hour: 13, minute: 15 },
      },
    ];

    testSaga(handleScheduleReminders)
      .next()
      .call(Notifications.cancelAllScheduledNotificationsAsync)
      .next()
      .select(selectReminderNotificationSchedule)
      .next(mockNotificationSchedule)
      .all([
        call(
          Notifications.scheduleNotificationAsync,
          mockNotificationSchedule[0],
        ),
        call(
          Notifications.scheduleNotificationAsync,
          mockNotificationSchedule[1],
        ),
      ])
      .next()
      .isDone();
  });
});

describe('watchScheduleReminders saga', () => {
  it('debounces multiple actions and calls handleScheduleReminders', () => {
    testSaga(watchScheduleReminders)
      .next()
      .debounce(
        3000,
        [
          incrementDayStartTime().type,
          decrementDayStartTime().type,
          incrementDayEndTime().type,
          decrementDayEndTime().type,
          toggleMondayIsActive().type,
          toggleTuesdayIsActive().type,
          toggleWednesdayIsActive().type,
          toggleThursdayIsActive().type,
          toggleFridayIsActive().type,
          toggleSaturdayIsActive().type,
          toggleSundayIsActive().type,
          remindersPerDayPicked().type,
          reminderAdded().type,
          reminderEdited().type,
          reminderDeleted().type,
        ],
        handleScheduleReminders,
      )
      .next()
      .isDone();
  });
});
