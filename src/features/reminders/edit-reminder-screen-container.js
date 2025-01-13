import { compose } from '@reduxjs/toolkit';
import { router } from 'expo-router';
import { connect } from 'react-redux';

import { withHeader } from '../navigation/with-header';
import { withLocalSearchParams } from '../navigation/with-local-search-params';
import { ReminderFormContainer } from './reminder-form-container';
import { reminderEdited, selectReminderById } from './reminders-reducer';

const mapStateToProps = (state, props) => ({
  submitLabel: 'Save Reminder',
  reminder: selectReminderById(state, props.id),
});

const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: message => {
    dispatch(reminderEdited({ id: props.id, message }));
    router.back();
  },
});

export default compose(
  withHeader({ title: 'Edit Reminder' }),
  withLocalSearchParams,
  connect(mapStateToProps, mapDispatchToProps),
)(ReminderFormContainer);
