import { head, pipe, pluck, sort, split, take } from 'ramda';

/**
 * Generates a random integer between the start and end values, both inclusive.
 *
 * @param {number} start - The starting value.
 * @param {number} end - The ending value.
 * @returns {number} - A random integer between the start and end.
 */
export const generateRandomInt = (start, end) =>
  Math.round(Math.random() * (end - start) + start);

/**
 * Generates a random minute value between 0 and 59.
 *
 * @returns {number} - A random minute value.
 */
const getRandomMinute = () => generateRandomInt(0, 59);

/**
 * Retrieves the hour part from a time string formatted as hh:mm.
 *
 * @param {string} time - The time string from which to extract the hour.
 * @returns {number} - The extracted hour as a number.
 */
export const getHours = pipe(split(':'), head, Number);

/**
 * Shuffles an array randomly.
 *
 * @template T - The type of the elements in the array.
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]} - The shuffled array.
 */
const shuffle = sort(() => Math.random() - 0.5);

/**
 * Extracts the 'message' property from an array of objects.
 *
 * @template T - The type of the elements in the array.
 * @param {Array<{ message: T }>} array - The array of objects containing a
 * 'message' property.
 * @returns {T[]} - An array containing the extracted 'message' values.
 */
const getMessages = pluck('message');

/**
 * Selects a specified number of random values from the input array. If the
 * number of elements to select is greater than the length of the input array,
 * the array can include duplicates.
 *
 * @template T - The type of the elements in the array.
 * @param {number} numberOfElements - The number of random elements to select.
 * @param {T[]} array - The array from which to select random values.
 * @returns {T[]} - An array containing the selected random values.
 */
export const selectRandomValues = (numberOfElements, array) => {
  const shuffledArray = shuffle(array);

  if (numberOfElements <= array.length) {
    return take(numberOfElements, shuffledArray);
  }

  const remaining = numberOfElements - array.length;
  const extraElements = Array.from(
    { length: remaining },
    () => array[generateRandomInt(0, array.length - 1)],
  );

  return shuffle([...shuffledArray, ...extraElements]);
};

// ... getMessages

/**
 * Creates a scheduled reminder object based on provided details.
 *
 * @param {Object} options - The details for the reminder.
 * @param {number} options.day - The day of the week for the reminder.
 * @param {string} options.reminder - The content of the reminder.
 * @param {string} options.startTime - The start time for the reminder, formatted as hh:mm.
 * @param {string} options.endTime - The end time for the reminder, formatted as hh:mm.
 * @returns {Object} - A scheduled reminder object.
 */
export const createScheduledNotification = ({
  day,
  reminder,
  startTime,
  endTime,
}) => ({
  content: {
    title: 'Random Reminder App',
    body: reminder,
  },
  trigger: {
    repeats: true,
    weekday: day,
    hour: generateRandomInt(getHours(startTime), getHours(endTime)),
    minute: getRandomMinute(),
  },
});
/**
 * Creates a schedule of notifications based on the provided details.
 *
 * @param {Object} options - The details for the schedule.
 * @param {Object[]} options.reminders - The array of reminders.
 * @param {number[]} options.activeDays - The active days of the week.
 * @param {string} options.startTime - The start time for the reminders,
 * formatted as hh:mm.
 * @param {string} options.endTime - The end time for the reminders, formatted
 * as hh:mm.
 * @param {number} options.remindersPerDay - The number of reminders per day.
 * @returns {Object[][]} - A two-dimensional array where each sub-array contains
 * scheduled notifications for the reminders for a day.
 */
export const createNotificationSchedule = ({
  reminders,
  activeDays,
  startTime,
  endTime,
  remindersPerDay,
}) =>
  activeDays.flatMap(day =>
    selectRandomValues(remindersPerDay, getMessages(reminders)).map(reminder =>
      createScheduledNotification({ day, reminder, startTime, endTime }),
    ),
  );
