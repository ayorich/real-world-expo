import { faker } from '@faker-js/faker';

import { settingsConstants } from './settings-constants';

export const createSettingsState = ({
  dayStartTime = '08:00',
  dayEndTime = '22:00',
  mondayIsActive = true,
  tuesdayIsActive = true,
  wednesdayIsActive = true,
  thursdayIsActive = true,
  fridayIsActive = true,
  saturdayIsActive = true,
  sundayIsActive = true,
  remindersPerDay = 12,
} = {}) => ({
  dayStartTime,
  dayEndTime,
  mondayIsActive,
  tuesdayIsActive,
  wednesdayIsActive,
  thursdayIsActive,
  fridayIsActive,
  saturdayIsActive,
  sundayIsActive,
  remindersPerDay,
});

export const createPopulatedSettingsState = ({
  dayStartTime = faker.number
    .int({ min: 0, max: 10 })
    .toString()
    .padStart(2, '0') + ':00',
  dayEndTime = faker.number
    .int({ min: 11, max: 23 })
    .toString()
    .padStart(2, '0') + ':00',
  mondayIsActive = faker.datatype.boolean(),
  tuesdayIsActive = faker.datatype.boolean(),
  wednesdayIsActive = faker.datatype.boolean(),
  thursdayIsActive = faker.datatype.boolean(),
  fridayIsActive = faker.datatype.boolean(),
  saturdayIsActive = faker.datatype.boolean(),
  sundayIsActive = faker.datatype.boolean(),
  remindersPerDay = faker.number.int({
    min: settingsConstants.MIN_REMINDERS_PER_DAY,
    max: settingsConstants.MAX_REMINDERS_PER_DAY,
  }),
} = {}) =>
  createSettingsState({
    dayStartTime,
    dayEndTime,
    mondayIsActive,
    tuesdayIsActive,
    wednesdayIsActive,
    thursdayIsActive,
    fridayIsActive,
    saturdayIsActive,
    sundayIsActive,
    remindersPerDay,
  });
