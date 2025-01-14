import { rootReducer } from '../../redux/root-reducer';
import {
  selectRemindersArray,
  reminderDeleted,
  reminderAdded,
  reminderEdited,
  selectReminderById,
  selectReminderNotificationSchedule,
} from './reminders-reducer';
import {
  remindersPerDayPicked,
  toggleFridayIsActive,
  toggleMondayIsActive,
  toggleThursdayIsActive,
  toggleTuesdayIsActive,
  toggleWednesdayIsActive,
} from '../settings/settings-reducer';

describe('reminders reducer', () => {
  describe('selectRemindersArray() selector', () => {
    test('given the initial state: returns the default reminders array', () => {
      const state = rootReducer();

      const actual = selectRemindersArray(state);
      const expected = [
        {
          id: 'hardcoded-first-reminder',
          message: 'You got this! 💪',
          dateCreated: '2024-10-01T00:00:00.000Z',
        },
        {
          id: 'hardcoded-second-reminder',
          message: 'Learn Redux at a senior-level.',
          dateCreated: '2024-10-02T00:00:00.000Z',
        },
        {
          id: 'hardcoded-third-reminder',
          message: 'Give a stranger a compliment 🫂',
          dateCreated: '2024-10-03T00:00:00.000Z',
        },
        {
          id: 'hardcoded-fourth-reminder',
          message: 'Subscribe to Jan Hesters on YouTube!',
          dateCreated: '2024-10-04T00:00:00.000Z',
        },
      ];

      expect(actual).toEqual(expected);
    });

    test('given a reminder deleted action and the id of the reminder to delete: deletes the reminder and returns the correct array', () => {
      const reminderId = 'hardcoded-third-reminder';
      const state = rootReducer(undefined, reminderDeleted(reminderId));

      const actual = selectRemindersArray(state);
      const expected = [
        {
          id: 'hardcoded-first-reminder',
          message: 'You got this! 💪',
          dateCreated: '2024-10-01T00:00:00.000Z',
        },
        {
          id: 'hardcoded-second-reminder',
          message: 'Learn Redux at a senior-level.',
          dateCreated: '2024-10-02T00:00:00.000Z',
        },
        {
          id: 'hardcoded-fourth-reminder',
          message: 'Subscribe to Jan Hesters on YouTube!',
          dateCreated: '2024-10-04T00:00:00.000Z',
        },
      ];

      expect(actual).toEqual(expected);
    });

    test('given a reminder added action: adds a reminder to the array and returns the correct array', () => {
      const reminder = createPopulatedReminder();
      const state = rootReducer(undefined, reminderAdded(reminder));

      const actual = selectRemindersArray(state);
      const expected = [
        {
          id: 'hardcoded-first-reminder',
          message: 'You got this! 💪',
          dateCreated: '2024-10-01T00:00:00.000Z',
        },
        {
          id: 'hardcoded-second-reminder',
          message: 'Learn Redux at a senior-level.',
          dateCreated: '2024-10-02T00:00:00.000Z',
        },
        {
          id: 'hardcoded-third-reminder',
          message: 'Give a stranger a compliment 🫂',
          dateCreated: '2024-10-03T00:00:00.000Z',
        },
        {
          id: 'hardcoded-fourth-reminder',
          message: 'Subscribe to Jan Hesters on YouTube!',
          dateCreated: '2024-10-04T00:00:00.000Z',
        },
        reminder,
      ];

      expect(actual).toEqual(expected);
    });

    test('given a reminder edited action: edits the reminder and returns the correct array', () => {
      const reminder = createPopulatedReminder({
        id: 'hardcoded-second-reminder',
      });
      const state = rootReducer(undefined, reminderEdited(reminder));

      const actual = selectRemindersArray(state);
      const expected = [
        {
          id: 'hardcoded-first-reminder',
          message: 'You got this! 💪',
          dateCreated: '2024-10-01T00:00:00.000Z',
        },
        reminder,
        {
          id: 'hardcoded-third-reminder',
          message: 'Give a stranger a compliment 🫂',
          dateCreated: '2024-10-03T00:00:00.000Z',
        },
        {
          id: 'hardcoded-fourth-reminder',
          message: 'Subscribe to Jan Hesters on YouTube!',
          dateCreated: '2024-10-04T00:00:00.000Z',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('selectReminderById() selector', () => {
    test('given a reminder id: returns the correct reminder', () => {
      const reminderId = 'hardcoded-second-reminder';
      const state = rootReducer();

      const actual = selectReminderById(state, reminderId);
      const expected = {
        id: 'hardcoded-second-reminder',
        message: 'Learn Redux at a senior-level.',
        dateCreated: '2024-10-02T00:00:00.000Z',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('selectReminderNotificationSchedule()', () => {
    test('given initial state, but configured to three reminders per day: returns an array of reminders for each day of the week between 8:00 and 22:00', () => {
      const mockMath = jest.spyOn(Math, 'random').mockReturnValue(1);

      const actions = [
        remindersPerDayPicked(3),
        toggleMondayIsActive(),
        toggleTuesdayIsActive(),
        toggleWednesdayIsActive(),
        toggleThursdayIsActive(),
        toggleFridayIsActive(),
      ];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectReminderNotificationSchedule(state);
      const expected = [
        {
          content: { title: 'Random Reminder App', body: 'You got this! 💪' },
          trigger: { repeats: true, weekday: 1, hour: 22, minute: 59 },
        },
        {
          content: {
            title: 'Random Reminder App',
            body: 'Learn Redux at a senior-level.',
          },
          trigger: { repeats: true, weekday: 1, hour: 22, minute: 59 },
        },
        {
          content: {
            title: 'Random Reminder App',
            body: 'Give a stranger a compliment 🫂',
          },
          trigger: { repeats: true, weekday: 1, hour: 22, minute: 59 },
        },
        {
          content: { title: 'Random Reminder App', body: 'You got this! 💪' },
          trigger: { repeats: true, weekday: 7, hour: 22, minute: 59 },
        },
        {
          content: {
            title: 'Random Reminder App',
            body: 'Learn Redux at a senior-level.',
          },
          trigger: { repeats: true, weekday: 7, hour: 22, minute: 59 },
        },
        {
          content: {
            title: 'Random Reminder App',
            body: 'Give a stranger a compliment 🫂',
          },
          trigger: { repeats: true, weekday: 7, hour: 22, minute: 59 },
        },
      ];

      expect(actual).toEqual(expected);

      mockMath.mockRestore();
    });
  });
});
