import { pipe, prop, values } from 'ramda';
import { createReminder } from './reminders-factories';
export const sliceName = 'reminders';

const initialState = {
  reminders: {
    'hardcoded-first-reminder': {
      id: 'hardcoded-first-reminder',
      message: 'You got this! 💪',
      dateCreated: '2024-10-01T00:00:00.000Z',
    },
    'hardcoded-second-reminder': {
      id: 'hardcoded-second-reminder',
      message: 'Learn Redux at a senior-level.',
      dateCreated: '2024-10-02T00:00:00.000Z',
    },
    'hardcoded-third-reminder': {
      id: 'hardcoded-third-reminder',
      message: 'Give a stranger a compliment 🫂',
      dateCreated: '2024-10-03T00:00:00.000Z',
    },
    'hardcoded-fourth-reminder': {
      id: 'hardcoded-fourth-reminder',
      message: 'Subscribe to Jan Hesters on YouTube!',
      dateCreated: '2024-10-04T00:00:00.000Z',
    },
  },
};

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case reminderDeleted().type: {
      const { [payload]: _, ...remainingReminders } = state.reminders;

      return { ...state, reminders: remainingReminders };
    }
    case reminderAdded().type: {
      return {
        ...state,
        reminders: { ...state.reminders, [payload.id]: payload },
      };
    }
    case reminderEdited().type: {
      return {
        ...state,
        reminders: {
          ...state.reminders,
          [payload.id]: { ...state.reminders[payload.id], ...payload },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const reminderDeleted = reminderId => ({
  type: `${sliceName}/reminderDeleted`,
  payload: reminderId,
});

export const reminderAdded = newReminder => ({
  type: `${sliceName}/reminderAdded`,
  payload: createReminder(newReminder),
});

export const reminderEdited = reminder => ({
  type: `${sliceName}/reminderEdited`,
  payload: reminder,
});

const selectRemindersSlice = prop(sliceName);

const selectReminders = pipe(selectRemindersSlice, prop('reminders'));

export const selectRemindersArray = pipe(selectReminders, values);

export const selectReminderById = (state, reminderId) =>
  pipe(selectReminders, prop(reminderId))(state);
