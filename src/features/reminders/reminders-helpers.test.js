import { faker } from '@faker-js/faker';

import { createPopulatedSettingsState } from '../settings/settings-factories';
import { createPopulatedReminder } from './reminders-factories';
import {
  createNotificationSchedule,
  createScheduledNotification,
  getMessages,
  selectRandomValues,
  generateRandomInt,
  getHours,
} from './reminders-helpers';

describe('generateRandomInt()', () => {
  const start = 3;
  const end = 20;
  const numbers = Array.from({ length: 100 }, () =>
    generateRandomInt(start, end),
  );

  test('given a start and end: every number is bigger or equal to the start', () => {
    const actual = numbers.every(number => number >= start);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('given a start and end: every number is smaller or equal to the end', () => {
    const actual = numbers.every(number => number <= end);
    const expected = true;

    expect(actual).toEqual(expected);
  });
});

describe('getHours()', () => {
  test.each([
    { timeString: '12:00', expected: 12 },
    { timeString: '00:00', expected: 0 },
    { timeString: '23:59', expected: 23 },
    { timeString: '03:00', expected: 3 },
  ])(
    'given a time string $timeString, returns $expected',
    ({ timeString, expected }) => {
      const actual = getHours(timeString);

      expect(actual).toEqual(expected);
    },
  );
});

describe('selectRandomValues()', () => {
  const array = ['foo', 42, { bar: 'qux' }, true, { hello: 'world' }, 1337];

  test('given an array and a number of elements: returns an array where each element is also an element in the original array', () => {
    const numberOfElements = faker.number.int({
      min: 1,
      max: array.length * 2,
    });

    const actual = selectRandomValues(numberOfElements, array).every(element =>
      array.includes(element),
    );
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is less than the total number of elements in the array: returns that many elements from the array', () => {
    const numberOfElements = 3;

    const actual = selectRandomValues(numberOfElements, array).length;
    const expected = numberOfElements;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is less than the total number of elements in the array: returns an array without duplicates', () => {
    const numberOfElements = 3;

    const actual = new Set(selectRandomValues(numberOfElements, array)).size;
    const expected = numberOfElements;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is equal to the total number of elements in the array: returns the full array, possibly shuffled', () => {
    const numberOfElements = array.length;

    const actual = selectRandomValues(numberOfElements, array).every(element =>
      array.includes(element),
    );
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is bigger than the total number of elements in the array: returns an array with duplicates, and possibly shuffled', () => {
    const numberOfElements = faker.number.int({
      min: array.length + 1,
      max: array.length * 2,
    });

    const actual = selectRandomValues(numberOfElements, array).every(element =>
      array.includes(element),
    );
    const expected = true;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is bigger than the total number of elements in the array: returns an array with that many elements, containing duplicates, and possibly shuffled', () => {
    const numberOfElements = faker.number.int({
      min: array.length + 1,
      max: array.length * 2,
    });

    const actual = selectRandomValues(numberOfElements, array).length;
    const expected = numberOfElements;

    expect(actual).toEqual(expected);
  });

  test('given an array and a number of elements that is bigger than the total number of elements in the array: returns an array that contains each element of the original array at least once', () => {
    const numberOfElements = faker.number.int({
      min: array.length + 1,
      max: array.length * 2,
    });
    const randomElements = selectRandomValues(numberOfElements, array);

    const actual = array.every(element => randomElements.includes(element));
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
describe('getMessages()', () => {
  test('given a list of reminders: returns a list of messages', () => {
    const reminders = [createPopulatedReminder(), createPopulatedReminder()];

    const actual = getMessages(reminders);
    const expected = [reminders[0].message, reminders[1].message];

    expect(actual).toEqual(expected);
  });
});
describe('createScheduledNotification()', () => {
  test('given a reminder: returns the scheduled notification with populated values for the trigger', () => {
    const reminder = createPopulatedReminder();
    const { dayStartTime, dayEndTime } = createPopulatedSettingsState();

    const actual = createScheduledNotification({
      reminder: reminder.message,
      day: faker.number.int({ min: 1, max: 7 }),
      startTime: dayStartTime,
      endTime: dayEndTime,
    });
    const expected = {
      content: { title: 'Random Reminder App', body: reminder.message },
      trigger: {
        repeats: true,
        weekday: expect.any(Number),
        hour: expect.any(Number),
        minute: expect.any(Number),
      },
    };

    expect(actual).toMatchObject(expected);
  });
});

describe('createNotificationSchedule()', () => {
  test('given a list of reminders, a list of integers for the active days, a start time, an end time and the amount of reminders per day: returns a schedule with the correct amount of reminders per day with random times between the start and end times', () => {
    const mockMath = jest.spyOn(Math, 'random').mockReturnValue(1);

    const reminders = [
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
    const activeDays = [1, 7]; // Only Saturday and Sunday are active.
    const startTime = '09:00';
    const endTime = '17:00';
    const remindersPerDay = 2;

    const actual = createNotificationSchedule({
      reminders,
      activeDays,
      startTime,
      endTime,
      remindersPerDay,
    });
    const expected = [
      {
        content: {
          title: 'Random Reminder App',
          body: 'You got this! 💪',
        },
        trigger: { repeats: true, weekday: 1, hour: 17, minute: 59 },
      },
      {
        content: {
          title: 'Random Reminder App',
          body: 'Learn Redux at a senior-level.',
        },
        trigger: { repeats: true, weekday: 1, hour: 17, minute: 59 },
      },
      {
        content: {
          title: 'Random Reminder App',
          body: 'You got this! 💪',
        },
        trigger: { repeats: true, weekday: 7, hour: 17, minute: 59 },
      },
      {
        content: {
          title: 'Random Reminder App',
          body: 'Learn Redux at a senior-level.',
        },
        trigger: { repeats: true, weekday: 7, hour: 17, minute: 59 },
      },
    ];

    expect(actual).toEqual(expected);

    mockMath.mockRestore();
  });
});
