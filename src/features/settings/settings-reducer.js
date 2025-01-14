import { createSettingsState } from './settings-factories';
import {
  all,
  complement,
  converge,
  equals,
  juxt,
  pipe,
  prop,
  addIndex,
  reduce,
} from 'ramda';
export const sliceName = 'settings';

const initialState = createSettingsState();

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case toggleMondayIsActive().type: {
      return { ...state, mondayIsActive: !state.mondayIsActive };
    }

    case toggleTuesdayIsActive().type: {
      return { ...state, tuesdayIsActive: !state.tuesdayIsActive };
    }

    case toggleWednesdayIsActive().type: {
      return { ...state, wednesdayIsActive: !state.wednesdayIsActive };
    }

    case toggleThursdayIsActive().type: {
      return { ...state, thursdayIsActive: !state.thursdayIsActive };
    }

    case toggleFridayIsActive().type: {
      return { ...state, fridayIsActive: !state.fridayIsActive };
    }

    case toggleSaturdayIsActive().type: {
      return { ...state, saturdayIsActive: !state.saturdayIsActive };
    }

    case toggleSundayIsActive().type: {
      return { ...state, sundayIsActive: !state.sundayIsActive };
    }
    case remindersPerDayPicked().type: {
      return { ...state, remindersPerDay: payload };
    }
    case incrementDayStartTime().type: {
      const newStartTime = incrementTime(state.dayStartTime);

      if (newStartTime !== state.dayEndTime) {
        return { ...state, dayStartTime: newStartTime };
      }

      return state;
    }

    case decrementDayStartTime().type: {
      if (state.dayStartTime === '00:00') {
        return state;
      }

      return { ...state, dayStartTime: decrementTime(state.dayStartTime) };
    }

    case incrementDayEndTime().type: {
      if (state.dayEndTime === '23:00') {
        return state;
      }

      return { ...state, dayEndTime: incrementTime(state.dayEndTime) };
    }

    case decrementDayEndTime().type: {
      const newEndTime = decrementTime(state.dayEndTime);

      if (newEndTime !== state.dayStartTime) {
        return { ...state, dayEndTime: newEndTime };
      }

      return state;
    }
    default: {
      return state;
    }
  }
};

// ... your actions
export const toggleMondayIsActive = () => ({
  type: `${sliceName}/toggleMondayIsActive`,
});

export const toggleTuesdayIsActive = () => ({
  type: `${sliceName}/toggleTuesdayIsActive`,
});

export const toggleWednesdayIsActive = () => ({
  type: `${sliceName}/toggleWednesdayIsActive`,
});

export const toggleThursdayIsActive = () => ({
  type: `${sliceName}/toggleThursdayIsActive`,
});

export const toggleFridayIsActive = () => ({
  type: `${sliceName}/toggleFridayIsActive`,
});

export const toggleSaturdayIsActive = () => ({
  type: `${sliceName}/toggleSaturdayIsActive`,
});

export const toggleSundayIsActive = () => ({
  type: `${sliceName}/toggleSundayIsActive`,
});
export const incrementDayStartTime = () => ({
  type: `${sliceName}/incrementDayStartTime`,
});

export const decrementDayStartTime = () => ({
  type: `${sliceName}/decrementDayStartTime`,
});

export const incrementDayEndTime = () => ({
  type: `${sliceName}/incrementDayEndTime`,
});

export const decrementDayEndTime = () => ({
  type: `${sliceName}/decrementDayEndTime`,
});
const selectSettingsSlice = prop(sliceName);

//selectors
export const selectMondayIsActive = pipe(
  selectSettingsSlice,
  prop('mondayIsActive'),
);

export const selectTuesdayIsActive = pipe(
  selectSettingsSlice,
  prop('tuesdayIsActive'),
);

export const selectWednesdayIsActive = pipe(
  selectSettingsSlice,
  prop('wednesdayIsActive'),
);

export const selectThursdayIsActive = pipe(
  selectSettingsSlice,
  prop('thursdayIsActive'),
);

export const selectFridayIsActive = pipe(
  selectSettingsSlice,
  prop('fridayIsActive'),
);

export const selectSaturdayIsActive = pipe(
  selectSettingsSlice,
  prop('saturdayIsActive'),
);

export const selectSundayIsActive = pipe(
  selectSettingsSlice,
  prop('sundayIsActive'),
);

export const remindersPerDayPicked = payload => ({
  payload,
  type: `${sliceName}/remindersPerDayPicked`,
});

export const selectRemindersPerDay = pipe(
  selectSettingsSlice,
  prop('remindersPerDay'),
);

export const selectAllDaysAreCurrentlyActive = pipe(
  juxt([
    selectSundayIsActive,
    selectMondayIsActive,
    selectTuesdayIsActive,
    selectWednesdayIsActive,
    selectThursdayIsActive,
    selectFridayIsActive,
    selectSaturdayIsActive,
  ]),
  all(equals(true)),
);
export const selectDayStartTime = pipe(
  selectSettingsSlice,
  prop('dayStartTime'),
);

export const selectDayEndTime = pipe(selectSettingsSlice, prop('dayEndTime'));

const notEquals = complement(equals);

export const selectCanIncrementDayStartTime = converge(notEquals, [
  pipe(selectDayStartTime, incrementTime),
  selectDayEndTime,
]);

export const selectCanDecrementDayStartTime = pipe(
  selectDayStartTime,
  notEquals('00:00'),
);

export const selectCanIncrementDayEndTime = pipe(
  selectDayEndTime,
  notEquals('23:00'),
);

export const selectCanDecrementDayEndTime = converge(notEquals, [
  pipe(selectDayEndTime, decrementTime),
  selectDayStartTime,
]);

/**
 * A selector that maps the activated week days to their integer values for
 * scheduling.
 * @see https://docs.expo.dev/versions/latest/sdk/notifications/#weeklytriggerinput
 *
 * @param {Object} state The redux state.
 * @returns {Array} An array of integers representing the active week days.
 */
export const selectActiveWeekdayIntegers = pipe(
  juxt([
    selectSundayIsActive,
    selectMondayIsActive,
    selectTuesdayIsActive,
    selectWednesdayIsActive,
    selectThursdayIsActive,
    selectFridayIsActive,
    selectSaturdayIsActive,
  ]),
  addIndex(reduce)(
    (accumulator, isActive, index) =>
      isActive ? [...accumulator, index + 1] : accumulator,
    [],
  ),
);

export const selectReminderNotificationSchedule = () => {};
