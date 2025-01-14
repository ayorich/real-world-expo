import { combineReducers } from '@reduxjs/toolkit';

import {
  reducer as remindersReducer,
  sliceName as remindersSliceName,
} from '../features/reminders/reminders-reducer';
import {
  reducer as settingsReducer,
  sliceName as settingsSliceName,
} from '../features/settings/settings-reducer';

export const rootReducer = combineReducers({
  [remindersSliceName]: remindersReducer,
  [settingsSliceName]: settingsReducer,
});

export const rootState = rootReducer(undefined, { type: '' });
