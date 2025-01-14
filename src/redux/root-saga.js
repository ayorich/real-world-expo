import { all } from 'redux-saga/effects';

import { reminderSagas } from '../features/reminders/reminders-sagas';

export function* rootSaga() {
  yield all([reminderSagas()]);
}
