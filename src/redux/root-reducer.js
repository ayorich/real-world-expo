import { combineReducers } from '@reduxjs/toolkit';

import {
  reducer as remindersReducer,
  sliceName as remindersSliceName,
} from '../features/reminders/reminders-reducer';

export const rootReducer = combineReducers({
  [remindersSliceName]: remindersReducer,
});

export const rootState = rootReducer(undefined, { type: '' });
