import { rootReducer } from '../../redux/root-reducer';
import {
  selectFridayIsActive,
  selectMondayIsActive,
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
  remindersPerDayPicked,
  selectRemindersPerDay,
  selectAllDaysAreCurrentlyActive,
  decrementDayEndTime,
  decrementDayStartTime,
  incrementDayEndTime,
  incrementDayStartTime,
  selectCanDecrementDayEndTime,
  selectCanDecrementDayStartTime,
  selectCanIncrementDayEndTime,
  selectCanIncrementDayStartTime,
  selectDayEndTime,
  selectDayStartTime,
  sliceName,
  selectActiveWeekdayIntegers,
} from './settings-reducer';

import { createPopulatedSettingsState } from './settings-factories';
describe('settings reducer', () => {
  describe('selectMondayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectMondayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given monday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleMondayIsActive());

      const actual = selectMondayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given monday is activated again: returns true', () => {
      const actions = [toggleMondayIsActive(), toggleMondayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectMondayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectTuesdayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectTuesdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given tuesday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleTuesdayIsActive());

      const actual = selectTuesdayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given tuesday is activated again: returns true', () => {
      const actions = [toggleTuesdayIsActive(), toggleTuesdayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectTuesdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectWednesdayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectWednesdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given wednesday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleWednesdayIsActive());

      const actual = selectWednesdayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given wednesday is activated again: returns true', () => {
      const actions = [toggleWednesdayIsActive(), toggleWednesdayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectWednesdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectThursdayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectThursdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given thursday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleThursdayIsActive());

      const actual = selectThursdayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given thursday is activated again: returns true', () => {
      const actions = [toggleThursdayIsActive(), toggleThursdayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectThursdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectFridayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectFridayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given friday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleFridayIsActive());

      const actual = selectFridayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given friday is activated again: returns true', () => {
      const actions = [toggleFridayIsActive(), toggleFridayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectFridayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectSaturdayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectSaturdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given saturday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleSaturdayIsActive());

      const actual = selectSaturdayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given saturday is activated again: returns true', () => {
      const actions = [toggleSaturdayIsActive(), toggleSaturdayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectSaturdayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectSundayIsActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectSundayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given sunday is deactivated: returns false', () => {
      const state = rootReducer(undefined, toggleSundayIsActive());

      const actual = selectSundayIsActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given sunday is activated again: returns true', () => {
      const actions = [toggleSundayIsActive(), toggleSundayIsActive()];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectSundayIsActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectRemindersPerDay() selector', () => {
    test('given initial state: returns 12', () => {
      const state = rootReducer();

      const actual = selectRemindersPerDay(state);
      const expected = 12;

      expect(actual).toEqual(expected);
    });

    test('given a reminders per day picked action: sets the reminders per day', () => {
      const remindersPerDay = createPopulatedSettingsState().remindersPerDay;
      const state = rootReducer(
        undefined,
        remindersPerDayPicked(remindersPerDay),
      );

      const actual = selectRemindersPerDay(state);
      const expected = remindersPerDay;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectAllDaysAreCurrentlyActive() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectAllDaysAreCurrentlyActive(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given all days are deactivated: returns false', () => {
      const actions = [
        toggleMondayIsActive(),
        toggleTuesdayIsActive(),
        toggleWednesdayIsActive(),
        toggleThursdayIsActive(),
        toggleFridayIsActive(),
        toggleSaturdayIsActive(),
        toggleSundayIsActive(),
      ];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectAllDaysAreCurrentlyActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });

    test('given some days are activated (e.g. "monday", "wednesday", "friday"): returns false', () => {
      const actions = [
        toggleTuesdayIsActive(),
        toggleThursdayIsActive(),
        toggleSaturdayIsActive(),
        toggleSundayIsActive(),
      ];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectAllDaysAreCurrentlyActive(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });
  describe('selectDayStartTime() selector', () => {
    test('given initial state: returns "08:00"', () => {
      const state = rootReducer();

      const actual = selectDayStartTime(state);
      const expected = '08:00';

      expect(actual).toEqual(expected);
    });

    test('given an increment day start time action: returns the new start time', () => {
      const state = rootReducer(undefined, incrementDayStartTime());

      const actual = selectDayStartTime(state);
      const expected = '09:00';

      expect(actual).toEqual(expected);
    });

    test('given an increment day start time action when the day start time is an hour less than the day end time: leaves the day start time unchanged', () => {
      const state = rootReducer(
        {
          ...rootReducer,
          [sliceName]: createPopulatedSettingsState({
            dayStartTime: '21:00',
            dayEndTime: '22:00',
          }),
        },
        incrementDayStartTime(),
      );

      const actual = selectDayStartTime(state);
      const expected = '21:00';

      expect(actual).toEqual(expected);
    });

    test('given a decrement day start time action: returns the new start time', () => {
      const state = rootReducer(undefined, decrementDayStartTime());

      const actual = selectDayStartTime(state);
      const expected = '07:00';

      expect(actual).toEqual(expected);
    });

    test('given a decrement day start time action when the day start time is 00:00: returns the current start time', () => {
      const state = rootReducer(
        {
          ...rootReducer,
          [sliceName]: createPopulatedSettingsState({ dayStartTime: '00:00' }),
        },
        decrementDayStartTime(),
      );

      const actual = selectDayStartTime(state);
      const expected = '00:00';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectDayEndTime() selector', () => {
    test('given initial state: returns "22:00"', () => {
      const state = rootReducer();

      const actual = selectDayEndTime(state);
      const expected = '22:00';

      expect(actual).toEqual(expected);
    });

    test('given an increment day end time action: returns the new end time', () => {
      const state = rootReducer(undefined, incrementDayEndTime());

      const actual = selectDayEndTime(state);
      const expected = '23:00';

      expect(actual).toEqual(expected);
    });

    test('given an increment day end time action when the day end time is "23:00": leaves the day end time unchanged', () => {
      const state = rootReducer(
        {
          ...rootReducer,
          [sliceName]: createPopulatedSettingsState({ dayEndTime: '23:00' }),
        },
        incrementDayEndTime(),
      );

      const actual = selectDayEndTime(state);
      const expected = '23:00';

      expect(actual).toEqual(expected);
    });

    test('given an decrement day end time action: returns the new end time', () => {
      const state = rootReducer(undefined, decrementDayEndTime());

      const actual = selectDayEndTime(state);
      const expected = '21:00';

      expect(actual).toEqual(expected);
    });

    test('given a decrement day end time action when the day end time is an hour more than the day start time: leaves the day end time unchanged', () => {
      const state = rootReducer(
        {
          ...rootReducer,
          [sliceName]: createPopulatedSettingsState({
            dayStartTime: '08:00',
            dayEndTime: '09:00',
          }),
        },
        decrementDayEndTime(),
      );

      const actual = selectDayEndTime(state);
      const expected = '09:00';

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCanIncrementDayStartTime() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectCanIncrementDayStartTime(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given the day start time is an hour behind the day end time: returns false', () => {
      const state = rootReducer({
        ...rootReducer(),
        [sliceName]: createPopulatedSettingsState({
          dayStartTime: '21:00',
          dayEndTime: '22:00',
        }),
      });

      const actual = selectCanIncrementDayStartTime(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCanDecrementDayStartTime() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectCanDecrementDayStartTime(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given the day start time is 00:00: returns false', () => {
      const state = rootReducer({
        ...rootReducer(),
        [sliceName]: createPopulatedSettingsState({ dayStartTime: '00:00' }),
      });

      const actual = selectCanDecrementDayStartTime(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCanIncrementDayEndTime() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectCanIncrementDayEndTime(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given the day end time is "23:00": returns false', () => {
      const state = rootReducer({
        ...rootReducer(),
        [sliceName]: createPopulatedSettingsState({ dayEndTime: '23:00' }),
      });

      const actual = selectCanIncrementDayEndTime(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectCanDecrementDayEndTime() selector', () => {
    test('given initial state: returns true', () => {
      const state = rootReducer();

      const actual = selectCanDecrementDayEndTime(state);
      const expected = true;

      expect(actual).toEqual(expected);
    });

    test('given the day end time is an hour ahead of the day start time: returns false', () => {
      const state = rootReducer({
        ...rootReducer(),
        [sliceName]: createPopulatedSettingsState({
          dayStartTime: '08:00',
          dayEndTime: '09:00',
        }),
      });

      const actual = selectCanDecrementDayEndTime(state);
      const expected = false;

      expect(actual).toEqual(expected);
    });
  });

  describe('selectActiveWeekdayIntegers()', () => {
    test('given initial state: returns [1, 2, 3, 4, 5, 6, 7] (1 = sunday, 7 = saturday)', () => {
      const state = rootReducer();

      const actual = selectActiveWeekdayIntegers(state);
      const expected = [1, 2, 3, 4, 5, 6, 7];

      expect(actual).toEqual(expected);
    });

    test('given all days are deactivated: returns an empty array', () => {
      const actions = [
        toggleMondayIsActive(),
        toggleTuesdayIsActive(),
        toggleWednesdayIsActive(),
        toggleThursdayIsActive(),
        toggleFridayIsActive(),
        toggleSaturdayIsActive(),
        toggleSundayIsActive(),
      ];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectActiveWeekdayIntegers(state);
      const expected = [];

      expect(actual).toEqual(expected);
    });

    test('given some days are activated (e.g. "monday", "wednesday", "friday"): returns an array of the active days', () => {
      const actions = [
        toggleTuesdayIsActive(),
        toggleThursdayIsActive(),
        toggleSaturdayIsActive(),
        toggleSundayIsActive(),
      ];
      const state = actions.reduce(rootReducer, rootReducer());

      const actual = selectActiveWeekdayIntegers(state);
      const expected = [2, 4, 6];

      expect(actual).toEqual(expected);
    });
  });
});
